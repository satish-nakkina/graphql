const { ApolloServer, gql } = require("apollo-server");
const { v4: uuid } = require("uuid");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const secretKey = "satish123";

const options = {
  expiresIn: "1h" // Set the token expiration time (e.g., "1h" for 1 hour)
};
// Create a mock user for demonstration purposes
const mockUser = {
  id: "1",
  username: "john.doe",
  password: "password"
};

const weatherData = [
  {
    id: "rerewr",
    city: 'New York',
    temperature: 25.5,
    humidity: 70,
    description: 'Sunny',
  },
  {
    id: "fewggewg",
    city: 'London',
    temperature: 18.2,
    humidity: 80,
    description: 'Cloudy',
  },
];

const typeDefs = gql`
  type Query {
    weatherData: [Weather!]!
    weather(city: String): Weather
    me: User
  }
  type User {
    id: ID
    username: String
  }
  type Mutation {
    addWeather(input: AddWeather): Weather!
    updateWeather(id: ID!, input: UpdateWeather): Weather
    deleteWeather(id: ID!): Boolean
    login(username: String!, password: String!): String
  }

  type Weather {
    id: ID!
    city: String!
    temperature: Float!
    humidity: Float!
    description: String!
  }

  input AddWeather {
    city: String
    temperature: Float
    humidity: Float
    description: String
  }

  input UpdateWeather {
    city: String
    temperature: Float
    humidity: Float
    description: String
  }
`;

const resolvers = {
  Query: {
    weatherData: () => weatherData,
    weather: (parent, { city }, context) => {
      const weather = weatherData.find((data) => data.city === city);
      return weather || null;
    },
    me: (parent, args, context) => {
      // Retrieve the user information from the context
      return context.user;
    },
  },
  Mutation: {
    addWeather: (parent, { input }, context) => {
      const { city, temperature, humidity, description } = input;
      const newCity = {
        id: uuid(),
        city,
        temperature,
        humidity,
        description,
      };
      weatherData.push(newCity);
      return newCity;
    },
    updateWeather: (parent, { id, input }, context) => {
      const { city, temperature, humidity, description } = input;
      const index = weatherData.findIndex((data) => data.id === id);
      if (index !== -1) {
        const updatedCity = {
          id,
          city: city || weatherData[index].city,
          temperature: temperature || weatherData[index].temperature,
          humidity: humidity || weatherData[index].humidity,
          description: description || weatherData[index].description,
        };
        weatherData[index] = updatedCity;
        return updatedCity;
      }
      return null;
    },
    deleteWeather: (parent, { id }, context) => {
      const index = weatherData.findIndex((data) => data.id === id);
      if (index !== -1) {
        weatherData.splice(index, 1);
        return true;
      } 
      return false;
    },
    login: async (parent, { username, password }) => {
      
     
      const hashedPassword = mockUser.password;
      
    
      if (password == hashedPassword) {
        
        const token = jwt.sign({ user: mockUser }, secretKey,options);
        // console.log(token)
        return token;
      } else {
        throw new Error("Invalid username or password");
      }
    },
    
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    
    const authHeader = req.headers.authorization;
  
     
    if (authHeader) {
      const token = authHeader.split(" ")[1];
  
      try {
        const decodedToken = jwt.verify(token, secretKey);
        console.log(decodedToken)
        // console.log("hello")
        const user = decodedToken.user;
  
        return { user };
      } catch (error) {
        console.error("Error verifying JWT token:", error);
      }
    }
  
    return {};
  },
  
});

server.listen().then(({ url }) => {
  console.log("server is ready at " + url);
});
