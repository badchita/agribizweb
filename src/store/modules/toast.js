import {
    make
} from 'vuex-pathify';
import {
    toastController
} from '@ionic/vue';

const state = {
    toast: ''
}

export default {
    namespaced: true,
    state,
    mutations: {
        ...make.mutations(state),
    },
    actions: {
        ...make.actions(state),
        async presentToast({
            commit
        }, {
            m,
            type
        }) {
            const toast = await toastController.create({
                message: m,
                color: type === 'message' ? 'danger' : 'success',
                position: 'top',
                duration: 3500,
                cssClass: 'toast-style',
                buttons: [{
                    text: 'Close',
                    role: 'cancel'
                }]
            })
            commit('SET_TOAST', m)
            return toast.present();
        }
    }
}