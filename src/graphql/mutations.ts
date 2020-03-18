import gql from 'graphql-tag';

export interface MutationSignUpInput {
  user: {
    email: string;
    password: string;
    name: string;
    statusMessage: string;
  };
}

export const MUTATION_SIGN_UP = gql`
  mutation signUp($user: UserInput!) {
    signUp(user: $user) {
      token
      user {
        id
        email
        verified
      }
    }
  }
`;

export interface MutationSendVerificationInput {
  email: string;
}

export const MUTATION_SEND_VERIFICATION = gql`
  mutation sendVerification($email: String!) {
    sendVerification(email: $email)
  }
`;

export interface SignInEmailInput {
  email: string; password: string;
}

export const MUTATION_SIGN_IN = gql`
  mutation signInEmail($email: String!, $password: String!) {
    signInEmail(email: $email, password: $password) {
      token
      user {
        id
        email
        nickname
        verified
        statusMessage
        authType
      }
    }
  }
`;

export const MUTATION_ADD_FRIEND = gql`
  mutation addFriend($friendId: ID!){
    addFriend(friendId: $friendId) {
      id
      email
      name
    }
  }
`;

export interface MutationRemoveFriend {
  id: string; 
}

export const MUTATION_DELETE_FRIEND = gql`
  mutation deleteFriend($id: ID!) {
    deleteFriend(id: $id) {
      id
    }
  }
`;
