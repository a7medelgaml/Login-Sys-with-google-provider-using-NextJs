    import { useEffect, useState } from 'react';
    import { useRouter } from 'next/router';
    import Head from 'next/head';
    import Cookies from 'js-cookie';

    export default function Dashboard() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const mockCourses = [
        {
        id: 1,
        title: 'أساسيات البرمجة',
        progress: 65
        },
        {
        id: 2,
        title: 'تطوير المواقع',
        progress: 40
        },
        {
        id: 3,
        title: 'التسويق الرقمي',
        progress: 80
        }
    ];

    const router = useRouter();

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        const token = Cookies.get('auth-token');
        const userData = Cookies.get('user-data');

        if (!token || !userData) {
        router.push('/login');
        return;
        }

        try {
        const res = await fetch('/api/auth/verify', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({ token })
        });

        if (res.ok) {
            setUser(JSON.parse(userData));
        } else {
            Cookies.remove('auth-token');
            Cookies.remove('user-data');
            router.push('/login');
        }
        } catch (err) {
        router.push('/login');
        } finally {
        setLoading(false);
        }
    };

    const handleLogout = () => {
        Cookies.remove('auth-token');
        Cookies.remove('user-data');
        router.push('/login');
    };

    if (loading) {
        return (
        <div className="d-flex justify-content-center align-items-center min-vh-100">
            <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">جارٍ التحميل...</span>
            </div>
        </div>
        );
    }

    return (
        <>
        <Head>
            <title>لوحة التحكم - المنصة التعليمية</title>
        </Head>

        <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
            <div className="container-fluid">
            <a className="navbar-brand fw-bold text-primary" href="#">المنصة التعليمية</a>
            <div className="ms-auto d-flex align-items-center">
                <span className="me-3">مرحبًا، {user.name}</span>
                <button onClick={handleLogout} className="btn btn-outline-danger btn-sm">تسجيل الخروج</button>
            </div>
            </div>
        </nav>

        <main className="container py-4">
            <h2 className="mb-4">مرحبًا {user.name}!</h2>

            <div className="row g-4">
            {/* Stats Cards */}
            <div className="col-md-4">
                <div className="card border-0 shadow-sm h-100">
                <div className="card-body">
                    <h5 className="card-title">الدورات المسجلة</h5>
                    <p className="display-6 mb-0">3</p>
                </div>
                </div>
            </div>
            <div className="col-md-4">
                <div className="card border-0 shadow-sm h-100">
                <div className="card-body">
                    <h5 className="card-title">الدروس المكتملة</h5>
                    <p className="display-6 mb-0">48</p>
                </div>
                </div>
            </div>
            <div className="col-md-4">
                <div className="card border-0 shadow-sm h-100">
                <div className="card-body">
                    <h5 className="card-title">ساعات التعلم</h5>
                    <p className="display-6 mb-0">124</p>
                </div>
                </div>
            </div>
            </div>

            <h3 className="mt-5 mb-3">دوراتك</h3>

            <div className="row g-4">
            {mockCourses.map((course) => (
                <div key={course.id} className="col-md-4">
                <div className="card border-0 shadow-sm h-100">
                    <div className="card-body">
                    <h5 className="card-title">{course.title}</h5>
                    <div className="progress my-3" style={{ height: '10px' }}>
                        <div className="progress-bar bg-success" role="progressbar" style={{ width: `${course.progress}%` }} aria-valuenow={course.progress} aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                    <small className="text-muted">{course.progress}% تقدم</small>
                    <button className="btn btn-success btn-sm w-100 mt-3">متابعة</button>
                    </div>
                </div>
                </div>
            ))}
            </div>
        </main>
        </>
    );
    }