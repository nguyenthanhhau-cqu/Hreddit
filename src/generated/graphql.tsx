import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type ErrorType = {
  __typename?: 'ErrorType';
  errorMessage: Scalars['String'];
  fieldName: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createPost?: Maybe<Post>;
  deletePost?: Maybe<Scalars['Boolean']>;
  login: UserRespond;
  logout: Scalars['Boolean'];
  register: UserRespond;
  updatePost?: Maybe<Post>;
};


export type MutationCreatePostArgs = {
  title?: Maybe<Scalars['String']>;
};


export type MutationDeletePostArgs = {
  id: Scalars['Float'];
};


export type MutationLoginArgs = {
  options: UserInput;
};


export type MutationRegisterArgs = {
  options: UserInput;
};


export type MutationUpdatePostArgs = {
  id: Scalars['Float'];
  title?: Maybe<Scalars['String']>;
};

export type Post = {
  __typename?: 'Post';
  createdAt: Scalars['String'];
  id: Scalars['Float'];
  title: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  me?: Maybe<User>;
  post?: Maybe<Post>;
  posts: Array<Post>;
};


export type QueryPostArgs = {
  id: Scalars['Int'];
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['String'];
  id: Scalars['Float'];
  updatedAt: Scalars['String'];
  userName: Scalars['String'];
};

export type UserInput = {
  passWord: Scalars['String'];
  userName: Scalars['String'];
};

export type UserRespond = {
  __typename?: 'UserRespond';
  errors?: Maybe<Array<ErrorType>>;
  user?: Maybe<User>;
};

export type LoginMutationVariables = Exact<{
  userName: Scalars['String'];
  passWord: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserRespond', user?: Maybe<{ __typename?: 'User', id: number, userName: string }>, errors?: Maybe<Array<{ __typename?: 'ErrorType', errorMessage: string, fieldName: string }>> } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type RegisterMutationVariables = Exact<{
  userName: Scalars['String'];
  passWord: Scalars['String'];
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'UserRespond', user?: Maybe<{ __typename?: 'User', id: number, userName: string }>, errors?: Maybe<Array<{ __typename?: 'ErrorType', errorMessage: string, fieldName: string }>> } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: Maybe<{ __typename?: 'User', id: number, userName: string }> };


export const LoginDocument = gql`
    mutation login($userName: String!, $passWord: String!) {
  login(options: {userName: $userName, passWord: $passWord}) {
    user {
      id
      userName
    }
    errors {
      errorMessage
      fieldName
    }
  }
}
    `;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument);
};
export const RegisterDocument = gql`
    mutation Register($userName: String!, $passWord: String!) {
  register(options: {userName: $userName, passWord: $passWord}) {
    user {
      id
      userName
    }
    errors {
      errorMessage
      fieldName
    }
  }
}
    `;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};
export const MeDocument = gql`
    query Me {
  me {
    id
    userName
  }
}
    `;

export function useMeQuery(options: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MeQuery>({ query: MeDocument, ...options });
};