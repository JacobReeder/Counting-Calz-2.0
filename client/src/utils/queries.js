import { gql } from '@apollo/client';

export const QUERY_USERS = gql`
  query Query {
    users {
      _id
      email
      username
      goal
      posts {
        _id
        description
        calories
        date_time
      }
    }
  }
`;

export const QUERY_ME = gql`
  query Query($username: String!, $email: String!) {
    me {
      _id
      goal
      email
      username
      posts {
        _id
        description
        user_id
        calories
      }
    }
  }
`;

export const QUERY_POST = gql`
  query Query {
    posts {
      _id
      description
      user_id
      calories
    }
  }
`
// not sure if we need to query goals
export const QUERY_GOAL = gql`
`

