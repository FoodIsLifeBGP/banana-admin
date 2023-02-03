import globalHook from 'use-global-hook';
import initialState from '../util/environment';
import * as actions from './actions';

const useGlobal = globalHook(initialState, actions);

export default useGlobal;
