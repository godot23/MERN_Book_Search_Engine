const { User } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
    Query: {
        getSingleUser: async (parent, { id }) => {
            return await User.findOne({ _id: id });
        }
    },
    Mutation: {
        createUser: async (parent, { username, email, password }) => {
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
                    { _id: profileId },
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

        removeBook: async(parent, {bookId}, context){
            if(context.user){
                return User.findOneAndUpdate(
                    {_id: context.user._id},
                    {$pull: {skills: skill}},
                    {new: true}
                );
            }
            throw AuthenticationError;
        }

    }
}

module.exports = resolvers;