'use server';

import { createClient } from '@/supabase/server';
import { GetActionResult } from '@/types';
import { OrderInsert, OrderRow, OrderUpdate } from '@/types/tables';
import { revalidatePath } from 'next/cache';
import { createBuildTimeClient } from '../client';

//GET
export async function getOrders(): Promise<GetActionResult<OrderRow[]>> {
  try {
    const supabase = await createClient();
    const { data: orders, error: ordersError } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });

    if (ordersError)
      return {
        success: false,
        error: ordersError.message,
      };

    return { success: true, data: orders };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : 'An unexpected error occurred',
    };
  }
}

export async function getOrdersDate(): Promise<GetActionResult<string[]>> {
  try {
    const supabase = await createClient();
    const { data: orders, error: ordersError } = await supabase
      .from('orders')
      .select('created_at');

    if (ordersError)
      return {
        success: false,
        error: ordersError.message,
      };

    return { success: true, data: orders.map((order) => order.created_at) };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : 'An unexpected error occurred',
    };
  }
}

export async function getOrderById(
  orderId: string,
): Promise<GetActionResult<OrderRow>> {
  try {
    const supabase = await createClient();
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .select('*')
      .eq('id', orderId)
      .single();

    if (orderError)
      return {
        success: false,
        error: orderError.message,
      };

    return { success: true, data: order };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : 'An unexpected error occurred',
    };
  }
}

export async function getOrdersByDate(
  date: string,
): Promise<GetActionResult<OrderRow[]>> {
  try {
    const supabase = await createClient();

    const startOfDay = `${date}T00:00:00.000Z`;
    const endOfDay = `${date}T23:59:59.999Z`;

    const { data: orders, error: ordersError } = await supabase
      .from('orders')
      .select('*')
      .gte('created_at', startOfDay)
      .lte('created_at', endOfDay)
      .order('created_at', { ascending: false });

    if (ordersError)
      return {
        success: false,
        error: ordersError.message,
      };

    return { success: true, data: orders };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : 'An unexpected error occurred',
    };
  }
}

export async function getAllOrdersId(): Promise<string[]> {
  try {
    const supabase = createBuildTimeClient();
    const { data: ordersId, error } = await supabase
      .from('orders')
      .select('id');

    if (error) {
      console.error('Error fetching menu item IDs:', error.message);
      return [];
    }

    return ordersId.map((item) => item.id);
  } catch (error) {
    console.error(
      'Unexpected error fetching menu item IDs:',
      error instanceof Error ? error.message : 'Unknown error',
    );
    return [];
  }
}

//CREATE
export async function createOrder(
  newOrder: OrderInsert,
  createdAt?: string | null,
): Promise<GetActionResult<OrderRow>> {
  try {
    const supabase = await createClient();
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        ...newOrder,

        created_at: createdAt
          ? new Date(createdAt).toISOString()
          : new Date().toISOString(),

        total_price: newOrder.items!.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0,
        ),
      })
      .select()
      .single();

    if (orderError || !order)
      return {
        success: false,
        error: orderError.message,
      };

    revalidatePath('/dashboard/orders');
    return { success: true, data: order };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : 'An unexpected error occurred',
    };
  }
}

//UPDATE
export async function updateOrder(
  orderId: string,
  orderUpdate: OrderUpdate,
): Promise<GetActionResult<OrderRow>> {
  try {
    const supabase = await createClient();
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .update({
        ...orderUpdate,

        total_price:
          orderUpdate.items &&
          orderUpdate.items.reduce(
            (acc, item) => acc + item.price * item.quantity,
            0,
          ),
      })
      .eq('id', orderId)
      .select()
      .single();

    if (orderError || !order)
      return {
        success: false,
        error: orderError.message,
      };

    revalidatePath('/dashboard/orders');
    return { success: true, data: order };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : 'An unexpected error occurred',
    };
  }
}

export async function updateOrderIsToGo(
  orderId: string,
  is_togo: boolean,
): Promise<GetActionResult<OrderRow>> {
  try {
    const supabase = await createClient();
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .update({ is_togo })
      .eq('id', orderId)
      .select()
      .single();

    if (orderError || !order)
      return {
        success: false,
        error: orderError.message,
      };

    revalidatePath('/dashboard/orders');
    return { success: true, data: order };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : 'An unexpected error occurred',
    };
  }
}

export async function updateOrderStatus(
  orderId: string,
  status: 'paid' | 'unpaid',
): Promise<GetActionResult<OrderRow>> {
  try {
    const supabase = await createClient();
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .update({ status })
      .eq('id', orderId)
      .select()
      .single();

    if (orderError || !order)
      return {
        success: false,
        error: orderError.message,
      };

    revalidatePath('/dashboard/orders');
    return { success: true, data: order };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : 'An unexpected error occurred',
    };
  }
}

//DELETE
export async function deleteOrder(orderId: string): Promise<GetActionResult> {
  try {
    const supabase = await createClient();
    const { data: deletedOrder, error: deleteOrderError } = await supabase
      .from('orders')
      .delete()
      .eq('id', orderId)
      .select('')
      .single();

    if (deleteOrderError)
      return {
        success: false,
        error: deleteOrderError.message,
      };

    revalidatePath('/dashboard/orders');
    return { success: true, data: undefined };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : 'An unexpected error occurred',
    };
  }
}
