    // pages/api/auth/login.js
    import bcrypt from 'bcryptjs'
    import jwt from 'jsonwebtoken'

    // في التطبيق الحقيقي هتكون database
    const users = [
    {
        id: 1,
        email: 'admin@example.com',
        password: '$2a$12$hashed_password', // bcrypt hash
        name: 'أحمد محمد',
        role: 'admin'
    }
    ]

    export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' })
    }

    try {
        const { email, password } = req.body

        // التحقق من وجود البيانات
        if (!email || !password) {
        return res.status(400).json({ 
            success: false, 
            message: 'يرجى ملء جميع الحقول' 
        })
        }

        // البحث عن المستخدم
        const user = users.find(u => u.email === email)
        
        if (!user) {
        return res.status(401).json({ 
            success: false, 
            message: 'البريد الإلكتروني أو كلمة المرور غير صحيحة' 
        })
        }

        // التحقق من كلمة المرور
        const isValidPassword = await bcrypt.compare(password, user.password)
        
        if (!isValidPassword) {
        return res.status(401).json({ 
            success: false, 
            message: 'البريد الإلكتروني أو كلمة المرور غير صحيحة' 
        })
        }

        // إنشاء JWT token
        const token = jwt.sign(
        { 
            userId: user.id, 
            email: user.email, 
            role: user.role 
        },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
        )

        // إرسال الاستجابة
        res.status(200).json({
        success: true,
        data: {
            token,
            user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
            }
        },
        message: 'تم تسجيل الدخول بنجاح'
        })

    } catch (error) {
        console.error('Login error:', error)
        res.status(500).json({ 
        success: false, 
        message: 'حدث خطأ في الخادم' 
        })
    }
    }