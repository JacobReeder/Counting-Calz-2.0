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
  {
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
        date_time
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


