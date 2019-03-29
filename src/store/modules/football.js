/**
 * Created by xiezg on 2018/4/9.
 */

import { getGoodsList, setsubscribeOperate, setScoreOperate, getsearchList } from '@/api/football'
import { getCk, setCk, removeCk } from '@/utils/auth'

const football = {
    state: {
    },
    mutations: {
    },
    actions: {
        // 商品列表
        football_getGoodsList({ commit }, obj) {
            return new Promise((resolve, reject) => {
                getGoodsList(obj).then(response => {
                    resolve(response.data)
                }).catch(error => {
                    reject(error)
                })
            })
        },
        football_setsubscribeOperate({ commit }, obj) {
            return new Promise((resolve, reject) => {
                setsubscribeOperate(obj).then(response => {
                    resolve(response.data)
                }).catch(error => {
                    reject(error)
                })
            })
        },
        football_setScoreOperate({ commit }, obj) {
            return new Promise((resolve, reject) => {
                setScoreOperate(obj).then(response => {
                    resolve(response.data)
                }).catch(error => {
                    reject(error)
                })
            })
        },
        football_getsearchList({ commit }, obj) {
            return new Promise((resolve, reject) => {
                getsearchList(obj).then(response => {
                    resolve(response.data)
                }).catch(error => {
                    reject(error)
                })
            })
        }
    }
}

export default football

 
 
 
 
 
// import ajax from '@/utils/ajax'
// import { src, platform, mapMutations, mapActions } from '@/utils/index'
// import { Message } from 'element-ui'

// import { getCK, setCK, removeCK } from '@/utils/auth'

// const state = {
//     withdrawList: null,
// };

// const mutationsInfo = mapMutations({
//     setWithDrawList(state, data) {
//         state.withdrawList = data
//     }
// }, 'football');

// const actionsInfo = mapActions({
//     /*  商品列表  */
//     async getGoodsList({ commit, dispatch }, pageData) {
//         try {
//             let InfoData = null;
//             InfoData = await ajax.post(`/football/matches`, pageData);
//             return InfoData
//         } catch (e) {
//             Message({
//                 message: e.message,
//                 type: 'error',
//                 duration: 5 * 1000
//             })
//             return 0
//         }
//     },

//     /*  比赛订阅  */
//     async setsubscribeOperate({ commit, dispatch }, data) {
//         try {
//             let InfoData = null;
//             if (data) {
//                 InfoData = await ajax.get(`/football/subscribe?matchid=${data.MatchID}&subscribe=${data.operateState}`);
//             } else {
//                 InfoData = await ajax.get(`/football/subscribe`);
//             }
//             return InfoData
//         } catch (e) {
//             Message({
//                 message: e.message,
//                 type: 'error',
//                 duration: 3000
//             });
//             return 0
//         }
//     },
//     /*  修改比分  */
//     async setScoreOperate({ commit, dispatch }, data) {
//         try {
//             let InfoData = null;
//             if (data) {
//                 InfoData = await ajax.get(`football/modify/result?matchid=${data.MatchID}&result=${data.result}`);
//             } else {
//                 InfoData = await ajax.get(`football/modify/result`);
//             }
//             return InfoData
//         } catch (e) {
//             Message({
//                 message: e.message,
//                 type: 'error',
//                 duration: 3000
//             });
//             return 0
//         }
//     },
//     /*  查询列表  */
//     async getsearchList({ commit, dispatch }, pageData) {
//         try {
//             let InfoData = null;
//             InfoData = await ajax.post(`/football/match/search`, pageData);
//             return InfoData
//         } catch (e) {
//             Message({
//                 message: e.message,
//                 type: 'error',
//                 duration: 5 * 1000
//             })
//             return 0
//         }
//     },
// }, 'football');


// export const mTypes = mutationsInfo.mTypes
// const mutations = mutationsInfo.mutations
// export const aTypes = actionsInfo.aTypes
// const actions = actionsInfo.actions
// export default { state, mutations, actions }