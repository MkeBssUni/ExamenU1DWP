<script>
import instance from '../config/axios';

export default {
    data() {
        return {
            form: {
                brand: '',
                model: '',
                year: '',
                serie: '',
                isValid: false
            },
            errorMsjs: {
                errorBrand: '',
                errorModel: '',
                errorYear: '',
                errorSerialNumber: ''
            },
            showErrors: {
                showBrand: true,
                showModel: true,
                showYear: true,
                showSerialNumber: true
            },
            arrayRegex: {
                alphaNum: /^[a-zA-Z0-9 ]+$/,
                validSerialNumber: /^[A-Za-z]{4}\d{3}-\d{2}[A-Za-z]{2}$/
            },
            itemsBreadCrumbs: [
                {
                    text: 'Inicio',
                    to: '/'
                },
                {
                    text: 'Autos disponibles',
                    to: '/all'
                }, {
                    text: 'Registrar auto',
                    to: '/newCar'
                }]

        }
    },
    methods: {
        notThisYear(year) {
            return year <= new Date().getFullYear()
        },

        validateSerialNumber(number) {
            return this.arrayRegex.validSerialNumber.test(number);
        },
        validateInput(input) {
            const { brand, model, year, serie } = this.form;
            const { errorMsjs, showErrors } = this;
            if (input === 'brand') {
                if (brand.length < 3) {
                    errorMsjs.errorBrand = 'La marca debe tener al menos 3 caracteres';
                    showErrors.showBrand = false;
                } else if (!this.arrayRegex.alphaNum.test(brand)) {
                    errorMsjs.errorBrand = 'La marca debe tener solo letras y números';
                    showErrors.showBrand = false;
                } else {
                    errorMsjs.errorBrand = '';
                    showErrors.showBrand = true;
                }
            }

            if (input === 'model') {
                if (model.length < 3) {
                    errorMsjs.errorModel = 'El modelo debe tener al menos 3 caracteres';
                    showErrors.showModel = false;
                } else if (!this.arrayRegex.alphaNum.test(model)) {
                    errorMsjs.errorModel = 'El modelo debe tener solo letras y números';
                    showErrors.showModel = false;
                } else {
                    errorMsjs.errorModel = '';
                    showErrors.showModel = true;
                }
            }

            if (input === 'year') {
                if (year.length < 4) {
                    errorMsjs.errorYear = 'El año debe tener 4 caracteres';
                    showErrors.showYear = false;
                } else if (!this.notThisYear(year)) {
                    errorMsjs.errorYear = 'El año no puede ser mayor al actual';
                    showErrors.showYear = false;
                } else {
                    errorMsjs.errorYear = '';
                    showErrors.showYear = true;
                }
            }

            if (input === 'serialNumber') {
                if (serie.length < 10) {
                    errorMsjs.errorSerialNumber = 'El número de serie debe tener al menos 10 caracteres';
                    showErrors.showSerialNumber = false;
                } else if (!this.validateSerialNumber(serie)) {
                    errorMsjs.errorSerialNumber = 'El número de serie debe tener el formato correcto';
                    showErrors.showSerialNumber = false;
                } else {
                    errorMsjs.errorSerialNumber = '';
                    showErrors.showSerialNumber = true;
                }
            }

            if (showErrors.showBrand && showErrors.showModel && showErrors.showYear && showErrors.showSerialNumber) {
                this.form.isValid = true;
            } else {
                this.form.isValid = false;
            }
        },
        submitForm() {
            if (this.form.isValid) {
                instance.post("/vehiculos",this.form).then((response) => {
                    alert('Formulario enviado correctamente');
                    setTimeout(() => {
                        this.$router.push('/all');
                    }, 1000);
                }).catch((error) => {
                    alert('Error al enviar el formulario');
                });
            } else {
                alert('Formulario invalido')
            }
        }
    }
}
</script>

<template>
    <div class="container p-5">
        <header>
            <b-breadcrumb :items="itemsBreadCrumbs"></b-breadcrumb>
        </header>
        <b-card title="Formulario" class="mb-2">
            <b-row>
                <!-- hacer responsive -->
                <b-col md="6">
                    <b-form-group id="input-group-1" label="Marca" label-for="input-1" :state="showErrors.showBrand"
                        :invalid-feedback="errorMsjs.errorBrand">
                        <b-form-input id="input-1" v-model.trim="form.brand" @input="validateInput('brand')"></b-form-input>
                    </b-form-group>
                </b-col>
                <b-col md="6">
                    <b-form-group id="input-group-2" label="Modelo" label-for="input-2" :state="showErrors.showModel"
                        :invalid-feedback="errorMsjs.errorModel">
                        <b-form-input id="input-2" v-model.trim="form.model" @input="validateInput('model')"></b-form-input>
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row>
                <b-col md="6">
                    <b-form-group id="input-group-3" label="Año" label-for="input-3" :state="showErrors.showYear"
                        :invalid-feedback="errorMsjs.errorYear">
                        <b-form-input id="input-3" v-model.trim="form.year" @input="validateInput('year')"
                            type="number"></b-form-input>
                    </b-form-group>
                </b-col>
                <b-col md="6">
                    <b-form-group id="input-group-4" label="Número de serie" label-for="input-4"
                        description="El número de serie debe tener el formato XXXX000-00XX"
                        :state="showErrors.showSerialNumber" :invalid-feedback="errorMsjs.errorSerialNumber">
                        <b-form-input id="input-4" v-model.trim="form.serie"
                            @input="validateInput('serialNumber')"></b-form-input>
                    </b-form-group>
                </b-col>
            </b-row>
            <b-button class="mt-2" @click="submitForm" variant="success" :disabled="!form.isValid">
                Enviar
            </b-button>

        </b-card>
    </div>
</template>