'use server';

import { GetActionResult } from '@/types';
import { createClient } from '../server';
import { OrderRow } from '@/types/tables';

export async function getOrders(): Promise<GetActionResult<OrderRow[]>> {
  try {
    const supabase = await createClient();
    const { data: orders, error: ordersError } = await supabase
      .from('orders')
      .select('*');

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
