-- Location: supabase/migrations/20250814135105_fabrichub_complete.sql
-- Schema Analysis: Fresh project - no existing schema
-- Integration Type: Complete fabric marketplace schema
-- Dependencies: None - fresh start

-- 1. Extensions & Types
CREATE TYPE public.user_role AS ENUM ('admin', 'vendor', 'designer', 'buyer');
CREATE TYPE public.order_status AS ENUM ('pending', 'processing', 'shipped', 'delivered', 'cancelled');
CREATE TYPE public.fabric_status AS ENUM ('active', 'inactive', 'out_of_stock');
CREATE TYPE public.experience_level AS ENUM ('entry', 'intermediate', 'senior', 'expert');

-- 2. Core User Table (Critical intermediary table)
CREATE TABLE public.user_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id),
    email TEXT NOT NULL UNIQUE,
    full_name TEXT NOT NULL,
    phone TEXT,
    address TEXT,
    role public.user_role DEFAULT 'buyer'::public.user_role,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 3. Vendors Table
CREATE TABLE public.vendors (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    description TEXT,
    contact_email TEXT NOT NULL,
    contact_phone TEXT,
    address TEXT,
    website TEXT,
    verified BOOLEAN DEFAULT false,
    rating DECIMAL(2,1) DEFAULT 0.0,
    location TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 4. Designers Table
CREATE TABLE public.designers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    bio TEXT,
    specialties TEXT[],
    years_experience INTEGER DEFAULT 0,
    experience_level public.experience_level DEFAULT 'entry'::public.experience_level,
    portfolio_url TEXT,
    contact_email TEXT NOT NULL,
    contact_phone TEXT,
    location TEXT,
    rating DECIMAL(2,1) DEFAULT 0.0,
    hourly_rate DECIMAL(10,2),
    available BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 5. Fabrics Table
CREATE TABLE public.fabrics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    vendor_id UUID REFERENCES public.vendors(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    description TEXT,
    material TEXT NOT NULL,
    composition TEXT,
    gsm INTEGER,
    width INTEGER,
    price_per_yard DECIMAL(10,2) NOT NULL,
    minimum_order_quantity INTEGER DEFAULT 1,
    stock_quantity INTEGER DEFAULT 0,
    care_instructions TEXT,
    status public.fabric_status DEFAULT 'active'::public.fabric_status,
    is_featured BOOLEAN DEFAULT false,
    rating DECIMAL(2,1) DEFAULT 0.0,
    review_count INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 6. Fabric Images Table
CREATE TABLE public.fabric_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    fabric_id UUID REFERENCES public.fabrics(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    display_order INTEGER DEFAULT 1,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 7. Orders Table
CREATE TABLE public.orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    buyer_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    order_number TEXT UNIQUE NOT NULL,
    status public.order_status DEFAULT 'pending'::public.order_status,
    total_amount DECIMAL(10,2) NOT NULL,
    shipping_address TEXT,
    billing_address TEXT,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 8. Order Items Table
CREATE TABLE public.order_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE,
    fabric_id UUID REFERENCES public.fabrics(id) ON DELETE CASCADE,
    quantity INTEGER NOT NULL,
    unit_price DECIMAL(10,2) NOT NULL,
    total_price DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 9. Cart Items Table
CREATE TABLE public.cart_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    fabric_id UUID REFERENCES public.fabrics(id) ON DELETE CASCADE,
    quantity INTEGER NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, fabric_id)
);

-- 10. Fabric Reviews Table
CREATE TABLE public.fabric_reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    fabric_id UUID REFERENCES public.fabrics(id) ON DELETE CASCADE,
    user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    review_text TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(fabric_id, user_id)
);

-- 11. Designer Portfolio Table
CREATE TABLE public.designer_portfolios (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    designer_id UUID REFERENCES public.designers(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    image_url TEXT,
    project_date DATE,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 12. Designer Reviews Table
CREATE TABLE public.designer_reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    designer_id UUID REFERENCES public.designers(id) ON DELETE CASCADE,
    user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    review_text TEXT,
    client_name TEXT,
    project_type TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(designer_id, user_id)
);

-- 13. Designer Contacts Table
CREATE TABLE public.designer_contacts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    designer_id UUID REFERENCES public.designers(id) ON DELETE CASCADE,
    client_name TEXT NOT NULL,
    client_email TEXT NOT NULL,
    client_phone TEXT,
    message TEXT NOT NULL,
    project_budget DECIMAL(10,2),
    project_timeline TEXT,
    responded BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 14. Essential Indexes
CREATE INDEX idx_user_profiles_email ON public.user_profiles(email);
CREATE INDEX idx_user_profiles_role ON public.user_profiles(role);
CREATE INDEX idx_vendors_user_id ON public.vendors(user_id);
CREATE INDEX idx_vendors_verified ON public.vendors(verified);
CREATE INDEX idx_designers_user_id ON public.designers(user_id);
CREATE INDEX idx_designers_specialties ON public.designers USING GIN(specialties);
CREATE INDEX idx_fabrics_vendor_id ON public.fabrics(vendor_id);
CREATE INDEX idx_fabrics_material ON public.fabrics(material);
CREATE INDEX idx_fabrics_status ON public.fabrics(status);
CREATE INDEX idx_fabric_images_fabric_id ON public.fabric_images(fabric_id);
CREATE INDEX idx_orders_buyer_id ON public.orders(buyer_id);
CREATE INDEX idx_orders_status ON public.orders(status);
CREATE INDEX idx_order_items_order_id ON public.order_items(order_id);
CREATE INDEX idx_order_items_fabric_id ON public.order_items(fabric_id);
CREATE INDEX idx_cart_items_user_id ON public.cart_items(user_id);
CREATE INDEX idx_fabric_reviews_fabric_id ON public.fabric_reviews(fabric_id);
CREATE INDEX idx_designer_portfolios_designer_id ON public.designer_portfolios(designer_id);
CREATE INDEX idx_designer_reviews_designer_id ON public.designer_reviews(designer_id);

-- 15. Storage Buckets
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES 
    ('fabric-images', 'fabric-images', true, 5242880, ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/jpg']),
    ('portfolio-images', 'portfolio-images', true, 5242880, ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/jpg']),
    ('user-avatars', 'user-avatars', false, 2097152, ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/jpg']);

-- 16. Enable RLS
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vendors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.designers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.fabrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.fabric_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cart_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.fabric_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.designer_portfolios ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.designer_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.designer_contacts ENABLE ROW LEVEL SECURITY;

-- 17. Functions for Role-Based Access
CREATE OR REPLACE FUNCTION public.is_admin_from_auth()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
SELECT EXISTS (
    SELECT 1 FROM auth.users au
    WHERE au.id = auth.uid() 
    AND (au.raw_user_meta_data->>'role' = 'admin' 
         OR au.raw_app_meta_data->>'role' = 'admin')
)
$$;

-- 18. RLS Policies - Pattern 1: Core User Tables
CREATE POLICY "users_manage_own_user_profiles"
ON public.user_profiles
FOR ALL
TO authenticated
USING (id = auth.uid())
WITH CHECK (id = auth.uid());

-- Admin access to all profiles
CREATE POLICY "admin_full_access_user_profiles"
ON public.user_profiles
FOR ALL
TO authenticated
USING (public.is_admin_from_auth())
WITH CHECK (public.is_admin_from_auth());

-- 19. RLS Policies - Pattern 2: Simple User Ownership
CREATE POLICY "users_manage_own_cart_items"
ON public.cart_items
FOR ALL
TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

CREATE POLICY "users_manage_own_orders"
ON public.orders
FOR ALL
TO authenticated
USING (buyer_id = auth.uid())
WITH CHECK (buyer_id = auth.uid());

CREATE POLICY "users_manage_own_fabric_reviews"
ON public.fabric_reviews
FOR ALL
TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

CREATE POLICY "users_manage_own_designer_reviews"
ON public.designer_reviews
FOR ALL
TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

-- 20. RLS Policies - Pattern 4: Public Read, Private Write
CREATE POLICY "public_can_read_fabrics"
ON public.fabrics
FOR SELECT
TO public
USING (status = 'active'::public.fabric_status);

CREATE POLICY "vendors_manage_own_fabrics"
ON public.fabrics
FOR ALL
TO authenticated
USING (vendor_id IN (SELECT id FROM public.vendors WHERE user_id = auth.uid()))
WITH CHECK (vendor_id IN (SELECT id FROM public.vendors WHERE user_id = auth.uid()));

CREATE POLICY "public_can_read_fabric_images"
ON public.fabric_images
FOR SELECT
TO public
USING (true);

CREATE POLICY "vendors_manage_fabric_images"
ON public.fabric_images
FOR ALL
TO authenticated
USING (fabric_id IN (SELECT id FROM public.fabrics WHERE vendor_id IN (SELECT id FROM public.vendors WHERE user_id = auth.uid())))
WITH CHECK (fabric_id IN (SELECT id FROM public.fabrics WHERE vendor_id IN (SELECT id FROM public.vendors WHERE user_id = auth.uid())));

-- Vendors table policies
CREATE POLICY "public_can_read_vendors"
ON public.vendors
FOR SELECT
TO public
USING (verified = true);

CREATE POLICY "vendors_manage_own_vendor_profile"
ON public.vendors
FOR ALL
TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

-- Designers table policies
CREATE POLICY "public_can_read_designers"
ON public.designers
FOR SELECT
TO public
USING (available = true);

CREATE POLICY "designers_manage_own_designer_profile"
ON public.designers
FOR ALL
TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

-- Designer portfolio policies
CREATE POLICY "public_can_read_designer_portfolios"
ON public.designer_portfolios
FOR SELECT
TO public
USING (true);

CREATE POLICY "designers_manage_own_portfolio"
ON public.designer_portfolios
FOR ALL
TO authenticated
USING (designer_id IN (SELECT id FROM public.designers WHERE user_id = auth.uid()))
WITH CHECK (designer_id IN (SELECT id FROM public.designers WHERE user_id = auth.uid()));

-- Order items policies
CREATE POLICY "users_view_own_order_items"
ON public.order_items
FOR SELECT
TO authenticated
USING (order_id IN (SELECT id FROM public.orders WHERE buyer_id = auth.uid()));

CREATE POLICY "vendors_view_own_product_orders"
ON public.order_items
FOR SELECT
TO authenticated
USING (fabric_id IN (SELECT id FROM public.fabrics WHERE vendor_id IN (SELECT id FROM public.vendors WHERE user_id = auth.uid())));

-- Designer contacts policies
CREATE POLICY "public_can_create_designer_contacts"
ON public.designer_contacts
FOR INSERT
TO public
WITH CHECK (true);

CREATE POLICY "designers_view_own_contacts"
ON public.designer_contacts
FOR SELECT
TO authenticated
USING (designer_id IN (SELECT id FROM public.designers WHERE user_id = auth.uid()));

-- Admin policies for management
CREATE POLICY "admin_full_access_orders"
ON public.orders
FOR ALL
TO authenticated
USING (public.is_admin_from_auth())
WITH CHECK (public.is_admin_from_auth());

CREATE POLICY "admin_full_access_vendors"
ON public.vendors
FOR ALL
TO authenticated
USING (public.is_admin_from_auth())
WITH CHECK (public.is_admin_from_auth());

CREATE POLICY "admin_full_access_designers"
ON public.designers
FOR ALL
TO authenticated
USING (public.is_admin_from_auth())
WITH CHECK (public.is_admin_from_auth());

-- 21. Storage RLS Policies
-- Fabric images (public bucket)
CREATE POLICY "public_can_view_fabric_images"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'fabric-images');

CREATE POLICY "vendors_upload_fabric_images"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'fabric-images');

CREATE POLICY "vendors_manage_fabric_images"
ON storage.objects
FOR UPDATE, DELETE
TO authenticated
USING (bucket_id = 'fabric-images' AND owner = auth.uid());

-- Portfolio images (public bucket)
CREATE POLICY "public_can_view_portfolio_images"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'portfolio-images');

CREATE POLICY "designers_upload_portfolio_images"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'portfolio-images');

CREATE POLICY "designers_manage_portfolio_images"
ON storage.objects
FOR UPDATE, DELETE
TO authenticated
USING (bucket_id = 'portfolio-images' AND owner = auth.uid());

-- User avatars (private bucket)
CREATE POLICY "users_view_own_avatars"
ON storage.objects
FOR SELECT
TO authenticated
USING (bucket_id = 'user-avatars' AND owner = auth.uid());

CREATE POLICY "users_upload_own_avatars"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
    bucket_id = 'user-avatars' 
    AND owner = auth.uid()
    AND (storage.foldername(name))[1] = auth.uid()::text
);

CREATE POLICY "users_manage_own_avatars"
ON storage.objects
FOR UPDATE, DELETE
TO authenticated
USING (bucket_id = 'user-avatars' AND owner = auth.uid());

-- 22. Functions for automatic profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
SECURITY DEFINER
LANGUAGE plpgsql
AS $$
BEGIN
  INSERT INTO public.user_profiles (id, email, full_name, role)
  VALUES (
    NEW.id, 
    NEW.email, 
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data->>'role', 'buyer')::public.user_role
  );  
  RETURN NEW;
END;
$$;

-- Trigger for new user creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 23. Functions for order number generation
CREATE OR REPLACE FUNCTION public.generate_order_number()
RETURNS TEXT
LANGUAGE plpgsql
AS $$
DECLARE
    order_num TEXT;
BEGIN
    order_num := 'FH' || TO_CHAR(NOW(), 'YYYYMMDD') || LPAD(FLOOR(RANDOM() * 10000)::TEXT, 4, '0');
    RETURN order_num;
END;
$$;

-- 24. Complete Mock Data
DO $$
DECLARE
    admin_uuid UUID := gen_random_uuid();
    vendor_user_uuid UUID := gen_random_uuid();
    designer_user_uuid UUID := gen_random_uuid();
    buyer_user_uuid UUID := gen_random_uuid();
    vendor_uuid UUID := gen_random_uuid();
    designer_uuid UUID := gen_random_uuid();
    fabric1_uuid UUID := gen_random_uuid();
    fabric2_uuid UUID := gen_random_uuid();
    fabric3_uuid UUID := gen_random_uuid();
    order_uuid UUID := gen_random_uuid();
BEGIN
    -- Create complete auth users with required fields
    INSERT INTO auth.users (
        id, instance_id, aud, role, email, encrypted_password, email_confirmed_at,
        created_at, updated_at, raw_user_meta_data, raw_app_meta_data,
        is_sso_user, is_anonymous, confirmation_token, confirmation_sent_at,
        recovery_token, recovery_sent_at, email_change_token_new, email_change,
        email_change_sent_at, email_change_token_current, email_change_confirm_status,
        reauthentication_token, reauthentication_sent_at, phone, phone_change,
        phone_change_token, phone_change_sent_at
    ) VALUES
        (admin_uuid, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
         'admin@fabrichub.com', crypt('admin123', gen_salt('bf', 10)), now(), now(), now(),
         '{"full_name": "Admin User", "role": "admin"}'::jsonb, '{"provider": "email", "providers": ["email"]}'::jsonb,
         false, false, '', null, '', null, '', '', null, '', 0, '', null, null, '', '', null),
        (vendor_user_uuid, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
         'vendor@fabrichub.com', crypt('vendor123', gen_salt('bf', 10)), now(), now(), now(),
         '{"full_name": "Premium Textile Mills", "role": "vendor"}'::jsonb, '{"provider": "email", "providers": ["email"]}'::jsonb,
         false, false, '', null, '', null, '', '', null, '', 0, '', null, null, '', '', null),
        (designer_user_uuid, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
         'designer@fabrichub.com', crypt('designer123', gen_salt('bf', 10)), now(), now(), now(),
         '{"full_name": "Sarah Johnson", "role": "designer"}'::jsonb, '{"provider": "email", "providers": ["email"]}'::jsonb,
         false, false, '', null, '', null, '', '', null, '', 0, '', null, null, '', '', null),
        (buyer_user_uuid, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
         'buyer@fabrichub.com', crypt('buyer123', gen_salt('bf', 10)), now(), now(), now(),
         '{"full_name": "John Smith", "role": "buyer"}'::jsonb, '{"provider": "email", "providers": ["email"]}'::jsonb,
         false, false, '', null, '', null, '', '', null, '', 0, '', null, null, '', '', null);

    -- Create vendors
    INSERT INTO public.vendors (id, user_id, name, description, contact_email, contact_phone, address, verified, rating, location) VALUES
        (vendor_uuid, vendor_user_uuid, 'Premium Textile Mills', 'Leading manufacturer of high-quality fabrics for fashion and home textiles.', 'contact@premiumtextiles.com', '+1-555-0123', '123 Industrial Ave, Textile City, TC 12345', true, 4.8, 'Textile City, TC'),
        (gen_random_uuid(), vendor_user_uuid, 'Royal Silk Weavers', 'Luxury silk fabrics sourced from premium silk farms.', 'info@royalsilk.com', '+1-555-0124', '456 Silk Road, Weave Town, WT 67890', true, 4.9, 'Weave Town, WT');

    -- Create designers
    INSERT INTO public.designers (id, user_id, name, bio, specialties, years_experience, experience_level, contact_email, contact_phone, location, rating, hourly_rate) VALUES
        (designer_uuid, designer_user_uuid, 'Sarah Johnson', 'Award-winning fashion designer specializing in sustainable and eco-friendly fashion. Over 10 years of experience in haute couture and ready-to-wear collections.', ARRAY['Sustainable Fashion', 'Haute Couture', 'Evening Wear', 'Bridal'], 10, 'expert'::public.experience_level, 'sarah@designstudio.com', '+1-555-0125', 'Fashion District, NYC', 4.9, 150.00),
        (gen_random_uuid(), designer_user_uuid, 'Michael Chen', 'Contemporary menswear designer with expertise in tailoring and modern fits.', ARRAY['Menswear', 'Tailoring', 'Casual Wear'], 7, 'senior'::public.experience_level, 'michael@moderncuts.com', '+1-555-0126', 'Downtown LA', 4.7, 120.00);

    -- Create fabrics
    INSERT INTO public.fabrics (id, vendor_id, name, description, material, composition, gsm, width, price_per_yard, minimum_order_quantity, stock_quantity, care_instructions, is_featured, rating) VALUES
        (fabric1_uuid, vendor_uuid, 'Premium Cotton Twill', 'High-quality cotton twill fabric perfect for workwear, uniforms, and casual garments. Features excellent durability and comfort with a smooth finish that is ideal for printing and embroidery.', 'Cotton', '100% Cotton', 180, 58, 12.50, 100, 500, 'Machine wash cold, tumble dry low', true, 4.8),
        (fabric2_uuid, vendor_uuid, 'Luxury Silk Charmeuse', 'Exquisite mulberry silk charmeuse with lustrous finish and fluid drape. Perfect for evening wear, lingerie, and luxury fashion applications. Sourced from premium silk farms.', 'Silk', '100% Mulberry Silk', 120, 45, 45.00, 50, 200, 'Dry clean only', true, 4.9),
        (fabric3_uuid, vendor_uuid, 'Stretch Denim 12oz', 'Premium stretch denim with excellent recovery and comfort. Ideal for jeans, jackets, and contemporary denim applications. Features sustainable production methods.', 'Denim', '98% Cotton, 2% Elastane', 340, 60, 18.75, 75, 300, 'Machine wash cold, hang dry', false, 4.7);

    -- Create fabric images
    INSERT INTO public.fabric_images (fabric_id, image_url, display_order) VALUES
        (fabric1_uuid, 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=500&h=500&fit=crop', 1),
        (fabric1_uuid, 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=500&fit=crop', 2),
        (fabric2_uuid, 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=500&h=500&fit=crop', 1),
        (fabric2_uuid, 'https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=500&h=500&fit=crop', 2),
        (fabric3_uuid, 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=500&h=500&fit=crop', 1);

    -- Create sample order
    INSERT INTO public.orders (id, buyer_id, order_number, total_amount, shipping_address, billing_address) VALUES
        (order_uuid, buyer_user_uuid, public.generate_order_number(), 537.50, '789 Fashion Ave, Style City, SC 11111', '789 Fashion Ave, Style City, SC 11111');

    -- Create order items
    INSERT INTO public.order_items (order_id, fabric_id, quantity, unit_price, total_price) VALUES
        (order_uuid, fabric1_uuid, 20, 12.50, 250.00),
        (order_uuid, fabric2_uuid, 5, 45.00, 225.00),
        (order_uuid, fabric3_uuid, 3, 18.75, 56.25);

    -- Create sample cart items
    INSERT INTO public.cart_items (user_id, fabric_id, quantity) VALUES
        (buyer_user_uuid, fabric1_uuid, 5),
        (buyer_user_uuid, fabric3_uuid, 2);

    -- Create fabric reviews
    INSERT INTO public.fabric_reviews (fabric_id, user_id, rating, review_text) VALUES
        (fabric1_uuid, buyer_user_uuid, 5, 'Excellent quality cotton twill. Perfect weight and texture for our uniforms.'),
        (fabric2_uuid, buyer_user_uuid, 5, 'Beautiful silk with amazing drape. Exactly what we needed for evening wear.');

    -- Create designer portfolio
    INSERT INTO public.designer_portfolios (designer_id, title, description, image_url, project_date) VALUES
        (designer_uuid, 'Sustainable Evening Collection 2024', 'Eco-friendly evening wear collection featuring organic and recycled materials.', 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=800&h=600&fit=crop', '2024-01-15'),
        (designer_uuid, 'Bridal Couture Line', 'Handcrafted bridal gowns with intricate beadwork and sustainable fabrics.', 'https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=800&h=600&fit=crop', '2023-11-20');

    -- Create designer reviews
    INSERT INTO public.designer_reviews (designer_id, user_id, rating, review_text, client_name, project_type) VALUES
        (designer_uuid, buyer_user_uuid, 5, 'Sarah created the most beautiful wedding dress for me. Her attention to detail and understanding of sustainable fashion is remarkable.', 'Emily Rodriguez', 'Bridal Gown');

EXCEPTION
    WHEN foreign_key_violation THEN
        RAISE NOTICE 'Foreign key error: %', SQLERRM;
    WHEN unique_violation THEN
        RAISE NOTICE 'Unique constraint error: %', SQLERRM;
    WHEN OTHERS THEN
        RAISE NOTICE 'Unexpected error: %', SQLERRM;
END $$;