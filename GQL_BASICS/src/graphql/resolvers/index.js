import axios from "axios";
const db = `http://localhost:3004`
const Query = {
    agent: async (parent, args, context, info) => {
        const response = await axios.get(`${db}/users/${args.id}`)
        return response.data
    },
    agents: async (parent, args, context, info) => {
        const name = args.name != null ? `name=${args.name}` : ''
        const age = args.age != null ? `age=${args.age}` : ''
        const response = await axios.get(`${db}/users?${name}&${age}`)
        return response.data
    },
    cars() {
        return ["Ford", "Swift", "Breeza"]
    },
    msg(parent, args, context, info) {
        if (args.values.length < 2) {
            return "sorry"
        }
        return `Hello ${args.values[0]} ${args.values[1]}`
    },
    posts: async () => {
        const response = await axios.get(`${db}/posts`)
        return response.data
    },
    post: async (parent, args, context, info) => {
        const response = await axios.get(`${db}/posts/${args.id}`)
        return response.data
    },
    pictures: async () => {
        const response = await axios.get(`${db}/pictures`)
        return response.data
    },
    getAnimal: async () => {
        let response;
        let random = Math.floor(Math.random() * 6) + 1
        if (random > 3) {
            response = {
                animal: 'Dog',
                name: 'Captain',
                hair: 'lots'

            }
        }
        else {
            response = {
                animal: 'Cat',
                name: 'Fluffy',
                paws: 'sharp'
            }
        }
        return response
    }

}
const Post = {
    author: async (parent, args, context, info) => {
        try {
            const response = await axios.get(`${db}/users/${parent.author}`)
            return response.data
        }
        catch (exception) {
            return null
        }
    },
    picture: async (parent, args, context, info) => {
        const response = await axios.get(`${db}/pictures/${parent.picture}`)
        return response.data
    }
}
const User = {
    posts: async (parent, args, context, info) => {
        const response = await axios.get(`${db}/posts?author=${parent.id}`)
        return response.data
    },
    pictures: async (parent, args, context, info) => {
        const response = await axios.get(`${db}/pictures?author=${parent.id}`)
        return response.data
    }
}
const Picture = {
    post: async (parent, args, context, info) => {
        const response = await axios.get(`${db}/posts/${parent.post}`)
        return response.data
    },
    author: async (parent, args, context, info) => {
        try {
            const response = await axios.get(`${db}/users/${parent.author}`)
            return response.data
        }
        catch (exception) {
            return null
        }
    }
}
const Mutation = {
    createUser: async (parent, args, context, info) => {
        const response = await axios.post(`${db}/users`, {
            name: args.data.name,
            age: args.data.age,
            married: args.data.married,
            status: args.data.status,
            average: 0
        })
        return response.data
    },
    createPost: async (parent, args, context, info) => {
        const response = await axios.post(`${db}/posts`, {
            title: args.title,
            content: args.content,
            author: args.author,
            picture: 1

        })
        return response.data
    },
    deletePost: async (parent, args, context, info) => {
        const response = await axios.delete(`${db}/posts/${args.id}`)
        if (Object.keys(response.data).length === 0) {
            return true
        }
        return false
    },
    deleteUser: async (parent, args, context, info) => {
        const response = await axios.delete(`${db}/users/${args.id}`)
        if (Object.keys(response.data).length === 0) {
            return true
        }
        return false
    },
    updateUser: async (parent, args, context, info) => {
        const data = {}
        if (args.name !== undefined) { data.name = args.name }
        if (args.age !== undefined) { data.age = args.age }
        if (args.married !== undefined) { data.married = args.married }
        if (args.status !== undefined) { data.status = args.status }
        const response = await axios.patch(`${db}/users/${args.id}`, data)
        return response.data



    },
}
const Animal = {
    __resolveType(obj, context, info) {
        if (obj.hair) {
            return 'Dog'
        }
        if (obj.paws) {
            return 'Cat'
        }
    }
}
export {
    Query,
    Post,
    User,
    Picture,
    Mutation,
    Animal
}