import * as yup from "yup";

// şifreyi kısıtlamak için kurallar
const regex =
  '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{5,}$';

// Doğrulama Şeması oluşturma:

export const schema = yup.object().shape({
    // email için zorunlulukları belirleme
    email: yup
    .string()
    .email("Lütfen geçerli bir mail giriniz")
    .required("Zorunlu alan"),

    age: yup
    .number()
    .min(18, "18 yaşından küçükler giremez")
    .max(100, "Yaşınız 100'den büyük olamaz")
    .integer("Yaşınız bir tamsayı olmalı"),

    password: yup
    .string()
    .min(5, "Şifre en az 5 karakter olmalı")
    // yazı belirlediğimiz kurallarla eşleşiyor mu bakar
    .matches(regex, "Şifreniz yeterince güçlü değil")
    .required("Zorunlu alan"),

    confirm_password: yup
    .string()
    // oneOf: elemanın değeri verilen değerlerden biriyle eşleşiyor mu, kontrol eder
    .oneOf(
        // ref: farklı bir inputtan veri çağırmaya yarar
        [yup.ref('password')],
        "Şifre eşleşmiyor"
    )
    .required("Zorunlu alan"),
});