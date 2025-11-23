interface AuthLang {
  // Page titles
  registerTitle: string;
  loginTitle: string;
  profileTitle: string;

  // Form labels
  nameLabel: string;
  emailLabel: string;
  passwordLabel: string;
  passwordConfirmationLabel: string;

  // Form placeholders
  namePlaceholder: string;
  emailPlaceholder: string;
  passwordPlaceholder: string;
  passwordConfirmationPlaceholder: string;

  // Button text
  registerButton: string;
  loginButton: string;
  submitting: string;

  // Navigation links
  alreadyHaveAccount: string;
  goToLogin: string;
  dontHaveAccount: string;
  goToRegister: string;

  // Validation messages
  nameRequired: string;
  emailRequired: string;
  emailInvalid: string;
  passwordRequired: string;
  passwordMinLength: string;
  passwordMismatch: string;

  // Success messages
  registerSuccess: string;
  loginSuccess: string;

  // Error messages
  registerError: string;
  loginError: string;
  genericError: string;

  // Profile page
  profileUsername: string;
  profileEmail: string;
  profilePhone: string;
  profileAddress: string;
  profileBirthDate: string;
  profileSex: string;
  profileIdCardNumber: string;
  profileStatus: string;
  profileCreatedAt: string;
  profileUpdatedAt: string;
  profileNotAvailable: string;
}

const lang: AuthLang = {
  // Page titles
  registerTitle: "Daftar Akun Baru",
  loginTitle: "Masuk ke Akun Anda",
  profileTitle: "Profil Saya",

  // Form labels
  nameLabel: "Nama Lengkap",
  emailLabel: "Email",
  passwordLabel: "Kata Sandi",
  passwordConfirmationLabel: "Konfirmasi Kata Sandi",

  // Form placeholders
  namePlaceholder: "Masukkan nama lengkap Anda",
  emailPlaceholder: "Masukkan email Anda",
  passwordPlaceholder: "Masukkan kata sandi",
  passwordConfirmationPlaceholder: "Masukkan ulang kata sandi",

  // Button text
  registerButton: "Daftar",
  loginButton: "Masuk",
  submitting: "Memproses...",

  // Navigation links
  alreadyHaveAccount: "Sudah punya akun?",
  goToLogin: "Masuk di sini",
  dontHaveAccount: "Belum punya akun?",
  goToRegister: "Daftar di sini",

  // Validation messages
  nameRequired: "Nama harus diisi",
  emailRequired: "Email harus diisi",
  emailInvalid: "Format email tidak valid",
  passwordRequired: "Kata sandi harus diisi",
  passwordMinLength: "Kata sandi minimal 6 karakter",
  passwordMismatch: "Kata sandi tidak cocok",

  // Success messages
  registerSuccess: "Pendaftaran berhasil! Silakan masuk.",
  loginSuccess: "Berhasil masuk!",

  // Error messages
  registerError: "Pendaftaran gagal. Silakan coba lagi.",
  loginError: "Login gagal. Periksa email dan kata sandi Anda.",
  genericError: "Terjadi kesalahan. Silakan coba lagi.",

  // Profile page
  profileUsername: "Nama Pengguna",
  profileEmail: "Email",
  profilePhone: "Nomor Telepon",
  profileAddress: "Alamat",
  profileBirthDate: "Tanggal Lahir",
  profileSex: "Jenis Kelamin",
  profileIdCardNumber: "Nomor KTP",
  profileStatus: "Status",
  profileCreatedAt: "Dibuat Pada",
  profileUpdatedAt: "Diperbarui Pada",
  profileNotAvailable: "Tidak tersedia",
};

export type { AuthLang };
export default lang;
