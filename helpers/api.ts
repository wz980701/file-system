import Axios from './axios';

class API extends Axios {
    async userLogin (params = {}) {
        return this.post('/user/userLogin', params, '用户登录失败');
    }
    async userLogout (params = {}) {
        return this.get('/user/userLogout', params, '用户登出失败');
    }
    async userRegister (params = {}) {
        return this.post('/user/userRegister', params, '用户注册失败');
    }
    async userModifyPassword (params = {}) {
        return this.post('/user/userModifyPassword', params, '用户修改密码失败');
    }
    async modifyUserPortrait (params = {}) {
        return this.post('/user/modifyUserPortrait', params, '用户修改头像失败', 'file');
    }
    async getUserInfo (params = {}) {
        return this.get('/user/getUserInfo', params, '获取个人信息失败');
    }
    async getFileCatalogList (params = {}) {
        return this.get('/common/fileCatalog/getFileCatalogList', params, '获取文件类型列表失败');
    }
    async getFileInfo (params = {}) {
        return this.get('/common/file/getFileInfo', params, '获取文件详情信息失败');
    }
    async getFileList (params = {}) {
        return this.get('/common/file/getFileList', params, '获取文件列表失败');
    }
    async searchFile (params = {}) {
        return this.post('/common/file/searchFile', params, '搜索文件失败');
    }
    async downloadFile (params = {}) {
        return this.get('/common/file/downloadFile', params, '下载文件失败', 'file');
    }
    async uploadFile (params = {}) {
        return this.post('/user/file/uploadFile', params, '上传文件失败');
    }
    async deleteFile (params = {}) {
        return this.post('/user/file/deleteFile', params, '删除文件失败');
    }
    async getUserFileList (params = {}) {
        return this.get('/user/file/getUserFileList', params, '获取上传文件失败');
    }
    async selectFileCommentList (params = {}) {
        return this.get('/common/file/comment/selectFileCommentList', params, '获取文件评论失败');
    }
    async addFileComment (params = {}) {
        return this.post('/user/file/comment/addFileComment', params, '添加文件评论失败');
    }
    async deleteFileComment (params = {}) {
        return this.get('/user/file/comment/deleteFileComment', params, '删除文件评论失败');
    }
    async likeFile (params = {}) {
        return this.get('/user/file/like/likeFile', params, '点赞文件失败');
    }
    async removeLikeFile (params = {}) {
        return this.get('/user/file/like/removeLikeFile', params, '取消点赞文件失败');
    }
    async collectFile (params = {}) {
        return this.get('/user/file/collection/collectFile', params, '收藏文件失败');
    }
    async removeCollection (params = {}) {
        return this.get('user/file/collection/removeCollection', params, '取消收藏文件失败');
    }
    async selectCollection (params = {}) {
        return this.get('/user/file/collection/selectCollection', params, '获取收藏文件列表失败');
    }
    async getDownloadRank (params = {}) {
        return this.get('/common/rank/getDownloadRank', params, '获取下载排行榜失败');
    }
    async getHotRank (params = {}) {
        return this.get('/common/rank/getHotRank', params, '获取热度排行榜失败');
    }
}

export default new API();