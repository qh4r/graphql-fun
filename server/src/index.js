const {GraphQLServer} = require('graphql-yoga');

const typeDefs = `
type Query {
    info: String!
    cats: [String!]!
}
`;

const resolvers = {
    Query: {
        info: () => 'some message',
        cats: () => ['Tim', 'Fluff', 'Topcat', 'Butters']
    }
};

const server = new GraphQLServer({
    typeDefs,
    resolvers
});

server.start(() => console.log("it's running on port 4k suppsedly :P"));