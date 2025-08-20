import { supabase } from '../lib/supabase';

// Get orders for a user
export const getUserOrders = async (userId, filters = {}) => {
  try {
    let query = supabase?.from('orders')?.select(`
        *,
        order_items(
          *,
          fabric:fabrics(
            id,
            name,
            fabric_images(image_url)
          )
        )
      `)?.eq('buyer_id', userId);

    // Apply filters
    if (filters?.status && filters?.status !== 'all') {
      query = query?.eq('status', filters?.status);
    }

    if (filters?.dateFrom) {
      query = query?.gte('created_at', filters?.dateFrom);
    }

    if (filters?.dateTo) {
      query = query?.lte('created_at', filters?.dateTo);
    }

    // Sorting
    query = query?.order('created_at', { ascending: false });

    const { data, error } = await query;

    if (error) {
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error('Error fetching user orders:', error);
    throw error;
  }
};

// Get all orders (admin only)
export const getAllOrders = async (filters = {}) => {
  try {
    let query = supabase?.from('orders')?.select(`
        *,
        buyer:user_profiles!orders_buyer_id_fkey(
          id,
          full_name,
          email
        ),
        order_items(
          *,
          fabric:fabrics(
            id,
            name,
            vendor:vendors(name)
          )
        )
      `);

    // Apply filters
    if (filters?.status && filters?.status !== 'all') {
      query = query?.eq('status', filters?.status);
    }

    if (filters?.search) {
      query = query?.or(`order_number.ilike.%${filters?.search}%`);
    }

    if (filters?.dateFrom) {
      query = query?.gte('created_at', filters?.dateFrom);
    }

    if (filters?.dateTo) {
      query = query?.lte('created_at', filters?.dateTo);
    }

    // Sorting
    query = query?.order('created_at', { ascending: false });

    // Pagination
    if (filters?.page && filters?.itemsPerPage) {
      const from = (filters?.page - 1) * filters?.itemsPerPage;
      const to = from + filters?.itemsPerPage - 1;
      query = query?.range(from, to);
    }

    const { data, error, count } = await query;

    if (error) {
      throw error;
    }

    return { data: data || [], count: count || 0 };
  } catch (error) {
    console.error('Error fetching all orders:', error);
    throw error;
  }
};

// Create new order
export const createOrder = async (orderData) => {
  try {
    const { data, error } = await supabase?.from('orders')?.insert([orderData])?.select()?.single();

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
};

// Update order status
export const updateOrderStatus = async (orderId, status) => {
  try {
    const { data, error } = await supabase?.from('orders')?.update({ 
        status,
        updated_at: new Date()?.toISOString()
      })?.eq('id', orderId)?.select()?.single();

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error updating order status:', error);
    throw error;
  }
};

// Get order by ID
export const getOrderById = async (orderId) => {
  try {
    const { data, error } = await supabase?.from('orders')?.select(`
        *,
        buyer:user_profiles!orders_buyer_id_fkey(
          id,
          full_name,
          email,
          phone
        ),
        order_items(
          *,
          fabric:fabrics(
            id,
            name,
            vendor:vendors(
              id,
              name,
              contact_email,
              contact_phone
            )
          )
        )
      `)?.eq('id', orderId)?.single();

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error fetching order by ID:', error);
    throw error;
  }
};

// Add order items
export const addOrderItems = async (orderId, items) => {
  try {
    const orderItems = items?.map(item => ({
      ...item,
      order_id: orderId
    }));

    const { data, error } = await supabase?.from('order_items')?.insert(orderItems)?.select();

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error adding order items:', error);
    throw error;
  }
};

// Get order metrics (admin dashboard)
export const getOrderMetrics = async () => {
  try {
    const [totalResult, pendingResult, completedResult, revenueResult] = await Promise.all([
      supabase?.from('orders')?.select('id', { count: 'exact', head: true }),
      supabase?.from('orders')?.select('id', { count: 'exact', head: true })?.eq('status', 'pending'),
      supabase?.from('orders')?.select('id', { count: 'exact', head: true })?.eq('status', 'completed'),
      supabase?.from('orders')?.select('total_amount')?.eq('status', 'completed')
    ]);

    const totalRevenue = revenueResult?.data?.reduce((sum, order) => sum + (order?.total_amount || 0), 0) || 0;

    return {
      totalOrders: totalResult?.count || 0,
      pendingOrders: pendingResult?.count || 0,
      completedOrders: completedResult?.count || 0,
      totalRevenue
    };
  } catch (error) {
    console.error('Error fetching order metrics:', error);
    throw error;
  }
};