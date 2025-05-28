'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // ⚠️ ملاحظة: استخدم next/navigation في App Router
import Head from 'next/head';
import Cookies from 'js-cookie';

// Types
interface FormData {
  email: string;
  password: string;
}

export default function Login() {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError(''); // مسح الرسالة عند التغيير
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        Cookies.set('auth-token', data.token, { expires: 1 });
        Cookies.set('user-data', JSON.stringify(data.user), { expires: 1 });
        router.push('/dashboard');
      } else {
        setError(data.message || 'بيانات الدخول غير صحيحة');
      }
    } catch (err) {
      setError('حدث خطأ في الاتصال بالخادم');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>تسجيل الدخول - المنصة التعليمية</title>
      </Head>

      <div className="min-vh-100 bg-light d-flex align-items-center">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6 col-lg-4">
              <div className="card shadow-sm border-0 rounded-4">
                <div className="card-body p-4">
                  <h3 className="card-title text-center mb-4">تسجيل الدخول</h3>

                  {error && (
                    <div className="alert alert-danger">{error}</div>
                  )}

                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">
                        البريد الإلكتروني
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        className="form-control"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="password" className="form-label">
                        كلمة المرور
                      </label>
                      <input
                        id="password"
                        name="password"
                        type="password"
                        className="form-control"
                        value={formData.password}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      className="btn btn-primary w-100"
                      disabled={loading}
                    >
                      {loading ? 'جاري تسجيل الدخول...' : 'دخول'}
                    </button>
                  </form>

                  <hr className="my-4" />

                  <div className="text-center small text-muted">
                    حسابات تجريبية:
                    <ul className="list-unstyled mt-2">
                      <li>
                        <strong>طالب:</strong> student@example.com | password123
                      </li>
                      <li>
                        <strong>معلم:</strong> teacher@example.com | teacher123
                      </li>
                      <li>
                        <strong>مدير:</strong> admin@example.com | admin123
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}