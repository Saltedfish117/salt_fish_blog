import { createVuetify } from 'vuetify'
export const vuetify = createVuetify({
    defaults: {
        VTextField: {
            variant: 'underlined',
            color: 'primary',
        },
        VTextarea: {
            variant: 'underlined',
            color: 'primary',
        },
        VInput: {
            variant: 'underlined',
            color: 'primary',
        },
        VBtn: {
            color: 'primary',
        },

        VSelect: {
            color: 'primary',
        },
        VCheckbox: {
            color: 'primary',
        }
    }
})
export default vuetify