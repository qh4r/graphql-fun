const {GraphQLServer} = require('graphql-yoga');

let mockLinks = [
    {
        id: 'l-1',
        description: 'some fun link',
        url: 'www.test.tld',
    },
    {
        id: 'l-2',
        description: 'other description',
        url: 'www.smutek.tld',
    },
    {
        id: 'l-3',
        description: 'something fun should have been written here',
        url: 'www.mocz.tld',
    },
    {
        id: 'l-4',
        description: 'some other fun thing could have been written instead of this stub',
        url: 'www.dupa.tld',
    },
];

let idCounter = mockLinks.length + 1;

const resolvers = {
    Query: {
        info: () => 'some message',
        cats: () => ['Tim', 'Fluff', 'Topcat', 'Butters'],
        feed: () => mockLinks,
    },
    Mutation: {
        postLink: (root, args) => {
            const newLink = {
                id: `l-${idCounter++}`,
                url: args.url,
                description: args.description,
            };

            mockLinks.push(newLink);
            return newLink;
        },
        updateLink: (root, args) => {
            const link = mockLinks.find(link => link.id === args.id);
            if(link) {
                link.url = args.url || link.url;
                link.description = args.description || link.description;
            }
            return link;
        },
        deleteLink: (root, args) => {
            const link = mockLinks.find(link => link.id === args.id);
            mockLinks = mockLinks.filter(link => link.id  !== args.id);
            return link;
        }
    }
    // following can be ommited cause yoga server deals with such easy mappings
    //Link: {
    //    id: (root) => root.id,
    //    description: (root) => root.description,
    //    url: (root) => root.url,
    //}
};

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers
});

server.start(() => console.log("it's running on port 4k suppsedly :P"));