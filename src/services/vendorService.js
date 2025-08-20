import { supabase } from '../lib/supabase';

// Get all vendors
export const getVendors = async (filters = {}) => {
  try {
    let query = supabase?.from('vendors')?.select(`
        *,
        fabrics(count)
      `);

    if (filters?.search) {
      query = query?.or(`name.ilike.%${filters?.search}%,location.ilike.%${filters?.search}%`);
    }

    if (filters?.verified !== undefined) {
      query = query?.eq('verified', filters?.verified);
    }

    query = query?.order('created_at', { ascending: false });

    const { data, error } = await query;

    if (error) {
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error('Error fetching vendors:', error);
    throw error;
  }
};

// Get vendor by ID
export const getVendorById = async (vendorId) => {
  try {
    const { data, error } = await supabase?.from('vendors')?.select(`
        *,
        fabrics(
          id,
          name,
          price_per_yard,
          rating,
          fabric_images(image_url)
        )
      `)?.eq('id', vendorId)?.single();

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error fetching vendor by ID:', error);
    throw error;
  }
};

// Get vendor dashboard data
export const getVendorDashboard = async (vendorId) => {
  try {
    const [vendorData, fabricsData, ordersData, metricsData] = await Promise.all([
      supabase?.from('vendors')?.select('*')?.eq('id', vendorId)?.single(),
      
      supabase?.from('fabrics')?.select('id, name, price_per_yard, stock_quantity, status')?.eq('vendor_id', vendorId)?.order('created_at', { ascending: false })?.limit(5),
      
      supabase?.from('order_items')?.select(`
          *,
          order:orders(
            id,
            status,
            created_at,
            buyer:user_profiles!orders_buyer_id_fkey(full_name)
          ),
          fabric:fabrics!order_items_fabric_id_fkey(name)
        `)?.eq('fabric.vendor_id', vendorId)?.order('created_at', { ascending: false })?.limit(10),
      
      // Get metrics
      Promise.all([
        supabase?.from('fabrics')?.select('id', { count: 'exact', head: true })?.eq('vendor_id', vendorId),
        supabase?.from('orders')?.select('total_amount')?.eq('vendor_id', vendorId)?.eq('status', 'completed')
      ])
    ]);

    const totalRevenue = metricsData?.[1]?.data?.reduce((sum, order) => sum + (order?.total_amount || 0), 0) || 0;

    return {
      vendor: vendorData?.data,
      recentFabrics: fabricsData?.data || [],
      recentOrders: ordersData?.data || [],
      metrics: {
        totalFabrics: metricsData?.[0]?.count || 0,
        totalRevenue
      }
    };
  } catch (error) {
    console.error('Error fetching vendor dashboard:', error);
    throw error;
  }
};

// Update vendor profile
export const updateVendorProfile = async (vendorId, updates) => {
  try {
    const { data, error } = await supabase?.from('vendors')?.update({
        ...updates,
        updated_at: new Date()?.toISOString()
      })?.eq('id', vendorId)?.select()?.single();

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error updating vendor profile:', error);
    throw error;
  }
};

// Create vendor (admin only)
export const createVendor = async (vendorData) => {
  try {
    const { data, error } = await supabase?.from('vendors')?.insert([vendorData])?.select()?.single();

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error creating vendor:', error);
    throw error;
  }
};

// Update vendor verification status (admin only)
export const updateVendorVerification = async (vendorId, verified) => {
  try {
    const { data, error } = await supabase?.from('vendors')?.update({ 
        verified,
        updated_at: new Date()?.toISOString()
      })?.eq('id', vendorId)?.select()?.single();

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error updating vendor verification:', error);
    throw error;
  }
};