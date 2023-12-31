const { User } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
    Query: {
        me: async (parent, args, context ) => {
            if(context.user){
                return await User.findOne({ _id: context.user.id });
            }

        }
    },
    Mutation: {
        addUser: async (parent, { username, email, password }) => {
            const user = User.create({ username, email, password });
            const token = signToken(user);
            return{token, user};
        },

        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw AuthenticationError;
            }

            const correctPw = await User.isCorrectPassword(password);

            if (!correctPw) {
                throw AuthenticationError;
            }

            const token = signToken(user);

            return { token, user };
        },

        saveBook: async (parent, { authors, description, title, bookId, image, link }, context) => {
            if (context.user) {
                return User.findOneAndUpdate(
                    { _id: context.user._id },
                    {
                        $addToSet: { savedBooks: { authors, description, title, bookId, image, link } }
                    },
                    {
                        new: true,
                        runValidators: true
                    }
                );
            }
            throw AuthenticationError;
        },

        removeBook: async(parent, {bookId}, context) => {
            if(context.user){
                return User.findOneAndUpdate(
                    {_id: bookId},
                    {$pull: {skills: skill}},
                    {new: true}
                );
            }
            throw AuthenticationError;
        }

    }
}

module.exports = resolvers;