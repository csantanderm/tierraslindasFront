import {takeLatest, call, put} from "redux-saga/effects"
import axios from "axios"
import { API_CALL_REQUEST } from "../Actions/actions"

//Watcher saga

export function* watcherLogin(){
    yield takeLatest(API_CALL_REQUEST, workerLogin)
}

export function* workerLogin(action){
    try {
        const response = yield call(fetchHttp(action.payload.request))
        const token = response.data
        yield put({
            type: action.payload.okAction,
            payload: {
                token:token
            }
        })
    } catch (error) {
        yield put({
            type: action.payload.failAction,
            payload: {
                error:error
            }
        })
    }
}

function fetchHttp(request) {
    return axios(request)
}