import useStore from 'use-global-hook';
import initialState from '../util/environment';
import * as actions from './actions';

const useGlobal = useStore(initialState, actions);

export default useGlobal;
