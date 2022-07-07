import React from "react";
import { Link } from "react-router-dom";
import * as S from "./styled";
import * as Yup from 'yup';
import { useFormik } from 'formik';
import logo from '../../assets/logofooter.png';

const validationSchema = Yup.object({
    email: Yup.string().email("E-mail não válido").required("Valor é requerido"),
    password: Yup.string().required("Valor é requerido"),
});

const LoginForm = () => {
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema,
        onSubmit: async values => {
            await loginUser(values)
            alert("Seja bem-vindo!")
        }
    })

    return (
        <S.Container>
            <S.Logo to='/'>
                <img src={logo} alt="República Hippie"/>
            </S.Logo>
            

            <S.FormContainer onSubmit={formik.handleSubmit}>
                <S.TittleForm>LOGIN</S.TittleForm>
                <S.FloatContainer className="floatContainer1">
                    <S.InputTittle for="floatField1">Email</S.InputTittle>
                    <S.FormInput 
                    type="email" 
                    className="floatContainer1"
                    id="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}/>
                </S.FloatContainer>
                {formik.errors.email && <span>{formik.errors.email}</span>}
                <S.FloatContainer className="floatContainer2">
                    <S.InputTittle for="floatField2">Senha</S.InputTittle>
                    <S.FormInput 
                    type="password" className="floatContainer2"
                    id="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}/>
                </S.FloatContainer>
                {formik.errors.password && <span>{formik.errors.password}</span>}
                <S.FormButton type="submit">Entrar</S.FormButton>
                <S.LinkSingUp to="/signup">Cadastre-se</S.LinkSingUp>
            </S.FormContainer>

        </S.Container>
    )
}

export default LoginForm