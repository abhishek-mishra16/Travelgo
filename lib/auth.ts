import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { prisma, isDbEnabled } from './prisma';
export const authOptions:NextAuthOptions={
  session:{strategy:'jwt'},
  providers:[CredentialsProvider({name:'TravelGo account',credentials:{email:{label:'Email',type:'email'},password:{label:'Password',type:'password'}},async authorize(credentials){
    if(!credentials?.email||!credentials.password)return null;
    if(!isDbEnabled()){
      const allowed:Record<string,{id:string;name:string;role:'USER'|'ADMIN';password:string}>={
        'demo@travelgo.dev':{id:'demo-user',name:'TravelGo Traveller',role:'USER',password:'TravelGo@123'},
        'admin@travelgo.dev':{id:'demo-admin',name:'TravelGo Admin',role:'ADMIN',password:'TravelGo@123'}
      }; const u=allowed[credentials.email]; if(u&&credentials.password===u.password)return {id:u.id,name:u.name,email:credentials.email,role:u.role}; return null;
    }
    const user=await prisma.user.findUnique({where:{email:credentials.email}}); if(!user)return null;
    if(!(await bcrypt.compare(credentials.password,user.passwordHash)))return null;
    return {id:user.id,name:user.name,email:user.email,role:user.role};
  }})],
  callbacks:{async jwt({token,user}){if(user){token.id=user.id;token.role=(user as any).role}return token},async session({session,token}){if(session.user){(session.user as any).id=token.id;(session.user as any).role=token.role}return session}},
  pages:{signIn:'/login'}
};
