const { User } = require('../models/user.model');
const { MyError } = require('../helpers/myError');
const { checkObjectId } = require('../helpers/checkObjectId');
const { hash, compare } = require('bcryptjs');
const { UserValidate } = require('../validates/user.validate');
const { sign, verify } = require('../helpers/jwt');
class UserService {

    static async getUserObject(user, log = false) {
        const userInfo = user.toObject();
        if (log) {
            const token = await sign({ _id: user._id });
            userInfo.token = token;
        }
        delete userInfo.password;
        return userInfo;
    }

    static getAll() {
        return User.find({}, { password: 0 });
    }

    static getById(_id) {
        checkObjectId(_id);
        return User.findById(_id, { password: 0 });
    }

    static async createUser(content) {

        await UserValidate.validateAsync(content)
            .catch(error => { throw new MyError(error.message, 400) });

        if (!content.password)
            throw new MyError('REQUUIRED_PASSWORD', 400);

        const findEmail = await User.findOne({ email: content.email });
        if (findEmail) throw new MyError('EMAIL_EXIST');
        content.password = await hash(content.password, 8);

        const user = new User(content);
        const createUser = await user.save();
        return this.getUserObject(createUser);
    }

    static async updateUser(idUser, content) {

        checkObjectId(idUser);

        if (content.password)
            throw new MyError('CONTENT_NOT_EXSIST_PASSWORD', 400)

        await UserValidate.validateAsync()
            .catch(error => { throw new MyError(error.message, 400) });

        const findUser = await User.findById(idUser);
        if (!findUser) throw new MyError('CAN_NOT_FIND_USER', 400);

        if (findUser.email != content.email)
            throw new MyError('INVALID_EMAIL', 400);

        const user = await User.findByIdAndUpdate(idUser, content, { new: true });
        return this.getUserObject(user);
    }

    static async removeUser(id) {

        checkObjectId(id);

        const user = await User.findByIdAndRemove(id);
        if (!user) throw new MyError('CAN_NOT_FIND_USER', 400);
        return this.getUserObject(user);
    }

    static async login(email, password) {
        if (!email) throw new MyError('MUST_BE_EMAIL', 400);
        if (!password) throw new MyError('MUST_BE_PASSWORD', 400);

        const user = await User.findOne({ email });
        if (!user) throw new MyError('INVALID_USER_INFO', 404);

        const equalPass = await compare(password, user.password);
        if (!equalPass) throw new MyError('INVALID_USER_INFO',400);

        return this.getUserObject(user, true);
    }

    static async checkToken(token) {
        if (!token) throw new MyError('TOKEN_EMPTY', 400);
        const { _id } = await verify(token).catch(() => {
            throw new MyError('INVALID_TOKEN', 400)
        })

        checkObjectId(_id);

        const user = await User.findById(_id);
        if(!user) throw new MyError('CAN_NOT_FIND_USER',404);
        return this.getUserObject(user)
    }
}

module.exports = { UserService };