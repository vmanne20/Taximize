import { loginWatcher, signUpWatcher, getUserTokenWatcher, createProfileWatcher } from './authSaga'
import { create_expense_watcher, get_expenses_watcher, get_taxes_watcher } from './dataSaga'
import { all } from 'redux-saga/effects'

export function* rootSaga() {
    yield all([
        loginWatcher(),
        signUpWatcher(),
        getUserTokenWatcher(),
        createProfileWatcher(),
        create_expense_watcher(),
        get_expenses_watcher(),
        get_taxes_watcher()
    ])
}