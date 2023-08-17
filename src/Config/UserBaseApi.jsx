import axios from 'axios'

const USER_BASE_URL=    `http://localhost:9000`

const UserBaseApi =axios.create({
    baseURL:USER_BASE_URL
})

export default UserBaseApi