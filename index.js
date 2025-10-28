const express = require("express");
const cors = require("cors");
require("dotenv").config();

const welcomeRoute = require("./routes/welcome");

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 7000;

app.get("/", (req, res) => {
  res.json("welcome");
});

app.use("/api", welcomeRoute);
app.get("/api/orders_related", (req, res) => {
  res.status(200).json({
    message: "which concern may i help you with?",
    options: [
      {
        id: "order_status",
        name: "Order Status",
        category: "orders_related",
      },
      {
        id: "cancel_order",
        name: "Cancel Order",
        category: "orders_related",
      },

      {
        id: "modifying_order",
        name: "Modifying Order",
        category: "orders_related",
      },
    ],
  });
});

//orders_related
app.get("/api/orders_related/:query", (req, res) => {
  const { query } = req.params;
  console.log(query);
  let response;

  if (query === "cancel_order") {
    response = {
      message:
        "cancel your order with in 3-5 mins. Go to Account > My Orders > Cancel Order",
    };
  } else if (query === "order_status") {
    response = {
      message: "Balu is on the way to delivery your order #OD1234.It  will be delivered in 3 mins. In mean time if you have any issue you connect with the delivery agent",
      options: [
        {
          id: "connect_delivery_partner",
          name: "Connect with delivery partner",
        },
        {
          id: "end_conversation",
          name: "Okay, got it",
        },
        {
          id: "main_menu",
          name: "Go back to main menu",
        },
      ],
    };
  } else if (query === "issue_placing_order") {
    response = {
      message: "Which concern may i help you with?",
      options: [
        {
          id: "store_unavailable",
          name: "Store is temporarily unavailable",
          category: "issue_placing_order",
        },
        {
          id: "product_not_available",
          name: "Product not available",
          category: "issue_placing_order",
        },
        {
          id: "area_out_of_service",
          name: "Area out of service",
          category: "issue_placing_order",
        },
      ],
    };
  }
  res.status(200).json(response);
});

app.get("/api/issue_placing_order/:query", (req, res) => {
  const { query } = req.params;

  let response;
  if (query === "store_unavailable") {
    response = {
      message:
        "Store is undergoing necessary maintance at the moment. Our team is working on it and we will notify you once we are available for delivery again. We apologise for the inconvenience.",
    };
  } else if (query === "area_out_of_service") {
    response = {
      message:
        "The store in your locality is not available for delivery right now. Please try placing an order later.",
    };
  } else if (query === "product_not_available") {
    response = {
      message:
        "Please type out the brand and name of the product(s), and we will try our best to make it available on Zippy.",
    };
  }
  res.status(200).json(response);
});

//offers_coupons
app.get("/api/offers_coupons", (req, res) => {
  res.status(200).json({
    message: "which concern may i help you with?",
    options: [
      {
        id: "apply_coupon",
        name: "Apply Coupon",
        category: "offers_coupons",
      },
      {
        id: "coupon_not_working",
        name: "Coupon not working",
        category: "offers_coupons",
      },
      {
        id: "show_available_offers",
        name: "Show available offers",
        category: "offers_coupons",
      },
    ],
  });
});

app.get("/api/offers_coupons/:query", (req, res) => {
  const { query } = req.params;
  if (query === "apply_coupon") {
    res.json({
      message:
        'Go to checkout → "Use Coupons" → select your offer and apply it.',
    });
  } else if (query === "coupon_not_working") {
    res.json({
      message:
        "Check if the coupon has expired or doesn’t apply to your cart items.",
    });
  }
});

app.get("/api/payments_refunds", (req, res) => {
  res.status(200).json({
    message: "Choose a payment-related concern:",
    options: [
      {
        id: "failed_payment",
        name: "Payment Failed",
        category: "payments_refunds",
      },
      {
        id: "refund_status",
        name: "Refund Status",
        category: "payments_refunds",
      },
      {
        id: "payment_methods",
        name: "Payment Methods & Wallets",
        category: "payments_refunds",
      },
    ],
  });
});

app.get("/api/payments_refunds/:query", (req, res) => {
  const { query } = req.params;
  let response;

  if (query === "failed_payment") {
    response = {
      message:
        "If your payment failed but the amount was deducted, it will be refunded automatically within 3–5 business days.",
    };
  } else if (query === "refund_status") {
    response = {
      message:
        "Refunds usually reflect in 3–7 days depending on your payment provider.",
    };
  } else if (query === "payment_methods") {
    response = {
      message:
        "You can pay using UPI, Credit/Debit Cards, Wallets, or Cash on Delivery.",
    };
  }

  res.status(200).json(response);
});

app.get("/api/return_replacement", (req, res) => {
  res.status(200).json({
    message: "What issue are you facing with delivery?",
    options: [
      {
        id: "wrong_item",
        name: "Wrong Item",
        category: "return_replacement",
      },
      {
        id: "damaged_item",
        name: "Damaged Item",
        category: "return_replacement",
      },
    ],
  });
});

// app.get("/api/return_replacement/:query", (req, res) => {
//   const { query } = req.params;
//   let message;

//   if (query === "late_delivery") {
//     message =
//       "We’re sorry for the delay! You can track your live ETA in ‘My Orders’.";
//   } else if (query === "wrong_item") {
//     message =
//       "Please report the issue from your order details screen. Our team will arrange a refund or replacement.";
//   } else if (query === "damaged_item") {
//     message =
//       "Upload a photo of the damaged item in the app → Help section. Refund will be processed after review.";
//   }

//   res.status(200).json({ message });
// });

// app.get("/api/return_replacement/damaged_item", (req, res) => {
//   const current_step = 1;

//   let response;

//   switch (current_step) {
//     case 1:
//       response = [
//         { orderId: "OD1234", items: ["Milk", "Bread"] },
//         {
//           orderId: "OD1235",
//           items: ["Eggs"],
//           id: "damaged_item",
//           // category: "return_replacement",
//         },
//       ];
//       break;

//     default:
//       break;
//   }
//   res.json({
//     message:
//       "Upload a photo of the damaged item in the app → Help section. Refund will be processed after review.",
//   });
// });

app.get("/api/orders/active", (req, res) => {
  res.status(200).json([
    {
      id: "OD1234",
      items: [
        {
          name: "Biscuit Pack",
          image:
            "https://media.istockphoto.com/id/503257367/photo/nabisco-oreo-milks-favorite-cookie-family-size-package.jpg?s=612x612&w=0&k=20&c=Tj2XBpV8w86xB76Zo-0nuENY7DvqNKZ2gxgv8jAZxWI=",
        },
        {
          name: "Soft Drink",
          image:
            "https://media.istockphoto.com/id/157726102/photo/classical-coca-cola-bottle.jpg?s=612x612&w=0&k=20&c=7s9UKO9O8ti8ELyt0A6-Rek-WITTG2m9y6joO8ETx8s=",
        },
        {
          name: "Soft Drink",
          image:
            "https://media.istockphoto.com/id/517416636/photo/milk-carton-with-custom-design.jpg?s=612x612&w=0&k=20&c=EoVARTiF1qDuPBPdDYPPlb0N8goW5RSBXcNV-eGR-7U=",
        },
      ],
      status: "Pending",
    },
    {
      id: "OD1235",
      items: [
        {
          name: "Biscuit Pack",
          image:
            "https://media.istockphoto.com/id/503257367/photo/nabisco-oreo-milks-favorite-cookie-family-size-package.jpg?s=612x612&w=0&k=20&c=Tj2XBpV8w86xB76Zo-0nuENY7DvqNKZ2gxgv8jAZxWI=",
        },
        {
          name: "Soft Drink",
          image:
            "https://media.istockphoto.com/id/157726102/photo/classical-coca-cola-bottle.jpg?s=612x612&w=0&k=20&c=7s9UKO9O8ti8ELyt0A6-Rek-WITTG2m9y6joO8ETx8s=",
        },
        {
          name: "Soft Drink",
          image:
            "https://media.istockphoto.com/id/517416636/photo/milk-carton-with-custom-design.jpg?s=612x612&w=0&k=20&c=EoVARTiF1qDuPBPdDYPPlb0N8goW5RSBXcNV-eGR-7U=",
        },
      ],
      status: "Pending",
    },
  ]);
});

app.get("/api/returned_orders/:query", (req, res) => {
  const { query } = req.params;

  if (query === "return_status") {
    return res.status(200).json({
      message:
        "Your return for Order OD1234 (Item: Milk 1L) is currently *In Transit*. The pickup was done on 23 Oct and it’s expected to reach our warehouse by 25 Oct.",
      options: [
        {
          id: "refund_status",
          name: "Check refund status",
          category: "returned_orders",
        },
      ],
    });
  }

  if (query === "pickup_issue") {
    return res.status(200).json({
      message: "Please select the issue you’re facing with pickup.",
      options: [
        {
          id: "pickup_not_done",
          name: "Pickup person didn’t come",
          category: "returned_orders",
        },
        {
          id: "reschedule_pickup",
          name: "Reschedule pickup",
          category: "returned_orders",
        },
      ],
    });
  }

  if (query === "refund_status") {
    return res.status(200).json({
      message:
        "Your refund is being processed and will be credited to your original payment method within 3-5 business days after item inspection.",
      options: [
        {
          id: "refund_mode",
          name: "Check refund mode",
          category: "returned_orders",
        },
        {
          id: "contact_support",
          name: "Talk to a support agent",
          category: "returned_orders",
        },
      ],
    });
  }

  if (query === "cancel_return") {
    return res.status(200).json({
      message:
        "Your return request can only be cancelled before pickup. Would you like to cancel your return for Order OD1234?",
      options: [
        {
          id: "confirm_cancel",
          name: "Yes, cancel my return",
          category: "returned_orders",
        },
        {
          id: "no_cancel",
          name: "No, keep it as is",
          category: "returned_orders",
        },
      ],
    });
  }

  if (query === "pickup_not_done") {
    return res.status(200).json({
      message:
        "We’re sorry the pickup wasn’t completed. Would you like to reschedule your pickup for a new time slot?",
      options: [
        {
          id: "reschedule_pickup",
          name: "Yes, reschedule pickup",
          category: "returned_orders",
        },
        {
          id: "contact_support",
          name: "No, I want to talk to support",
          category: "returned_orders",
        },
      ],
    });
  }

  if (query === "pickup_reschedule" || query === "reschedule_pickup") {
    return res.status(200).json({
      message: "Please select a new time slot for pickup.",
      options: [
        { id: "9_11am", name: "9 AM - 11 AM", category: "returned_orders" },
        { id: "11_1pm", name: "11 AM - 1 PM", category: "returned_orders" },
        { id: "4_6pm", name: "4 PM - 6 PM", category: "returned_orders" },
      ],
    });
  }

  if (query === "confirm_cancel") {
    return res.status(200).json({
      message:
        "Your return request for Order OD1234 has been successfully cancelled. Thank you for shopping with us!",
    });
  }

  if (query === "no_cancel") {
    return res.status(200).json({
      message: "No problem! Your return request remains active.",
    });
  }

  if (query === "refund_mode") {
    return res.status(200).json({
      message:
        "Your refund will be credited to your original payment method (UPI - Axis Bank ****1234).",
    });
  }

  if (query === "contact_support") {
    return res.status(200).json({
      message:
        "Connecting you to one of our support agents. Please wait a moment...",
      options: [],
    });
  }

  return res.status(404).json({ message: "Invalid query" });
});

app.post("/api/cancel_order", (req, res) => {
  const { current_step, orderId, refund_mode } = req.body;
  const orders = [
    {
      id: "OD1234",
      items: ["Biscuit Pack", "Soft Drink", "Banana Chips"],
      status: "Pending",
    },
    { id: "OD1235", items: ["Eggs"], status: "Pending" },
  ];

  if (current_step === "show_reasons") {
    return res.status(200).json({
      message: "Please tell us why you’d like to cancel your order.",
      options: [
        {
          id: "reason_wrong_item",
          name: "Do you find any better vendor",
          category: "cancel_order",
          next_step: "choose_cancel_type",
        },
        {
          id: "reason_delayed",
          name: "Delivery taking too long",
          category: "cancel_order",
          next_step: "choose_cancel_type",
        },
        {
          id: "reason_changed_mind",
          name: "Changed my mind",
          category: "cancel_order",
          next_step: "choose_cancel_type",
        },
        {
          id: "other_reasons",
          name: "Other reasons",
          category: "cancel_order",
          next_step: "choose_cancel_type",
        },
      ],
    });
  } else if (current_step === "choose_cancel_type") {
    res.status(200).json({
      message: "Would you like to cancel the whole order or specific items?",
      options: [
        {
          id: "cancel_whole_order",
          name: "Cancel whole order",
          next_step: "show_confirmation",
          category: "cancel_order",
        },
        {
          id: "cancel_specific_item",
          name: "Cancel specific item",
          next_step: "show_items",
          category: "cancel_order",
        },
      ],
    });
  } else if (current_step === "show_items") {
    const { items } = orders.filter((order) => order.id === orderId)[0];

    const options = items.map((item, index) => ({
      id: `#${item}${index}`,
      name: item,
      category: "cancel_order",
      next_step: "show_confirmation",
    }));

    res.status(200).json({
      message:
        "Got it! 😊 Please select the item(s) you’d like to cancel from your order.",
      options,
    });
  } else if (current_step === "show_confirmation") {
    return res.status(200).json({
      message:
        "We’ll go ahead and cancel this order. Please confirm if you’d like to proceed.",
      options: [
        {
          id: "confirm_cancel",
          name: "✅ Yes, cancel my order",
          next_step: "refund_mode_selection",
          category: "cancel_order",
        },
        {
          id: "keep_order",
          name: "❌ No, I want to keep my order",
          category: "cancel_order",
        },
      ],
    });
  } else if (current_step === "refund_mode_selection") {
    return res.status(200).json({
      message: "Where would you like the refund to be credited?",
      options: [
        {
          id: "refund_wallet",
          name: "Credit to Wallet",
          next_step: "order_cancel_confirmation",
          category: "cancel_order",
        },
        {
          id: "refund_bank",
          name: "Credit to Bank Account",
          next_step: "order_cancel_confirmation",
          category: "cancel_order",
        },
      ],
    });
  } else if (current_step === "order_cancel_confirmation") {
    refundMessage =
      refund_mode === "refund_wallet"
        ? "Your refund will be credited to your wallet within 1–2 hours. 💰"
        : "Your refund will be credited to your bank account within 1–2 business days. 🏦";
    return res.status(200).json({
      message: `✅ Your order has been successfully cancelled. ${refundMessage}.`,
    });
  }
});

// app.post("/api/cancel_order", (req, res) => {
//   const { current_step, orderId } = req.body;
//   console.log("cancel_order", current_step);

//   const orders = [
//     {
//       id: "OD1234",
//       items: ["Biscuit Pack", "Soft Drink", "Banana Chips"],
//       status: "Pending",
//     },
//     { id: "OD1235", items: ["Eggs"], status: "Pending" },
//   ];

//   if (current_step === "show_active_orders") {
//     res.status(200).json({
//       message: "please select the option",
//       options: [
//         {
//           id: "cancel_whole_order",
//           name: "Cancel Whole Order",
//           next_step: "show_confirmation",
//           category: "cancel_order",
//         },
//         {
//           id: "cancel_specific_item",
//           name: "Cancel Specific Item",
//           next_step: "show_items",
//           category: "cancel_order",
//         },
//       ],
//     });
//   } else if (current_step === "show_items") {
//     const { items } = orders.filter((order) => order.id === orderId)[0];

//     const options = items.map((item, index) => ({
//       id: `#${item}${index}`,
//       name: item,
//       category: "cancel_order",
//       next_step: "show_confirmation",
//     }));

//     res.status(200).json({
//       message: "Please choose items you want to cancel",
//       options,
//     });
//   } else if (current_step === "show_confirmation") {
//     res.status(200).json({
//       message: `Are you sure you want to cancel?`,
//       options: [
//         {
//           id: "yes",
//           name: "Yes",
//           category: "cancel_order",
//           next_step: "show_reasons",
//         },
//         {
//           id: "no",
//           name: "No",
//           category: "cancel_order",
//           next_step: "end_of_conversation",
//         },
//       ],
//     });
//   } else if (current_step === "show_reasons") {
//     res.status(200).json({
//       message: "Please tell us why you’d like to cancel your order.",
//       options: [
//         {
//           id: "reason_wrong_item",
//           name: "Do you find any better vendor",
//           category: "cancel_order",
//           next_step: "order_cancel_confirmation",
//         },
//         {
//           id: "reason_delayed",
//           name: "Delivery taking too long",
//           category: "cancel_order",
//           next_step: "order_cancel_confirmation",
//         },
//         {
//           id: "reason_changed_mind",
//           name: "Changed my mind",
//           category: "cancel_order",
//           next_step: "order_cancel_confirmation",
//         },
//         {
//           id: "other_reasons",
//           name: "Other reasons",
//           category: "cancel_order",
//           next_step: "order_cancel_confirmation",
//         },
//       ],
//     });
//   } else if (current_step === "order_cancel_confirmation") {
//     res.status(200).json({
//       message:
//         "✅ Your order has been successfully cancelled. The refund will be processed within 1-2 hours.",
//     });
//   }
// });

app.post("/api/modifying_order", (req, res) => {
  const { current_step, orderId, selectedItem, newAddedItem, quantity } =
    req.body;

  const orders = [
    {
      id: "OD1234",
      items: ["Biscuit Pack", "Soft Drink", "Banana Chips"],
      status: "Pending",
    },
    { id: "OD1235", items: ["Eggs"], status: "Pending" },
  ];

  if (current_step === "show_options") {
    return res.status(200).json({
      message: "Please choose one of the options.",
      options: [
        {
          id: "add_items",
          name: "Add Items",
          next_step: "add_items",
          category: "modifying_order",
        },
        {
          id: "delete_items",
          name: "Delete Items",
          category: "cancel_order",
          next_step: "show_items",
        },
      ],
    });
  } else if (current_step === "add_items") {
    return res.status(200).json({
      message: "please choose option",
      options: [
        {
          id: "add_new_item",
          name: "Add new Item",
          next_step: "add_new_item_confirmation",
          category: "modifying_order",
        },
        {
          id: "modify_in_existing_item",
          name: "Increase Quantity of existing item",
          category: "modifying_order",
          next_step: "increase_quantity_of_existing_item",
        },
      ],
    });
  } else if (current_step === "add_new_item_confirmation") {
    return res.status(200).json({
      message: `${newAddedItem} is added to your current order`,
    });
  } else if (current_step === "increase_quantity_of_existing_item") {
    const { items } = orders.filter((order) => order.id === orderId)[0];

    const options = items.map((item, index) => ({
      id: `increase_quantity`,
      name: item,
      category: "modifying_order",
      next_step: "increase-quantity_of_existing_item_confirmation",
    }));
    res.status(200).json({
      message: "Please choose item you want to increase quantity of:",
      options,
    });
  } else if (
    current_step === "increase-quantity_of_existing_item_confirmation"
  ) {
    res.status(200).json({
      message: `${selectedItem} of quantity ${quantity} is added to your current order`,
    });
  }
});

app.post("/api/reschedule_order", (req, res) => {
  const { current_step, orderId, selected_slot } = req.body;
  console.log(current_step);

  // Mock active orders
  const activeOrders = [
    {
      id: "OD1234",
      items: ["Biscuit Pack", "Soft Drink", "Banana Chips"],
      deliverySlot: "7 - 7:30 AM",
    },
    {
      id: "OD1235",
      items: ["Milk", "Paneer"],
      deliverySlot: "6 PM- 6:30 PM",
    },
  ];

  // Mock available new time slots
  const availableSlots = [
    "10 AM - 12 PM",
    "1 PM - 3 PM",
    "4 PM - 6 PM",
    "7 PM - 9 PM",
    "Customized time slot",
  ];

  // Step 1 → Show active orders
  if (current_step === "show_active_orders") {
    return res.json({
      message: "Here are your active orders that can be rescheduled:",
      options: activeOrders.map((order) => ({
        title: `Order ID: ${order.id} — ${order.items.join(
          ", "
        )} (Current Slot: ${order.deliverySlot})`,
        value: order.id,
      })),
      next_step: "select_order_to_reschedule",
    });
  }

  // Step 2 → Ask which order to reschedule
  if (current_step === "select_order_to_reschedule") {
    const selectedOrder = activeOrders.find((o) => o.id === orderId);
    if (!selectedOrder) {
      return res.json({
        message:
          "Sorry, I couldn't find that order. Please select a valid order to continue.",
        next_step: "show_active_orders",
        category: "reschedule_order",
      });
    }
    return res.json({
      message: `Your current delivery slot for Order ID ${orderId} is "${selectedOrder.deliverySlot}".\n\nPlease choose a new preferred time slot:`,
      options: availableSlots.map((slot) => ({
        id: slot,
        name: slot,
        next_step: "choose_new_slot",
        category: "reschedule_order",
      })),
    });
  }

  // Step 3 → Choose new slot
  if (current_step === "choose_new_slot") {
    // if (!availableSlots.includes(selected_slot)) {
    //   return res.json({
    //     message: "Please choose a valid time slot from the available options.",
    //     options: availableSlots.map((slot) => ({
    //       id: slot,
    //       name: slot,
    //       next_step: "choose_new_slot",
    //       category: "reschedule_order",
    //     })),
    //   });
    // }
    return res.json({
      message: `You’ve selected "${selected_slot}" as your new delivery slot.\n\nWould you like to confirm rescheduling for this slot?`,
      options: [
        {
          name: "✅ Yes, confirm reschedule",
          id: "confirm_reschedule",
          next_step: "confirm_reschedule",
          category: "reschedule_order",
        },
        {
          name: "❌ No, choose another slot",
          id: "choose_again",
          next_step: "confirm_reschedule",
          category: "reschedule_order",
        },
      ],
    });
  }

  // Step 4 → Confirm reschedule
  if (current_step === "confirm_reschedule") {
    if (selected_slot === "choose_again") {
      return res.json({
        message:
          "No problem! Please select another time slot from the available options below:",
        options: availableSlots.map((slot) => ({
          id: slot,
          name: slot,
          next_step: "choose_new_slot",
          category: "reschedule_order",
        })),
      });
    }

    // Simulate successful reschedule
    return res.json({
      message: `✅ Your delivery for Order ID ${orderId} has been successfully rescheduled to "${selected_slot}".\n\nYou’ll receive a notification when your order is out for delivery.`,
    });
  }

  // Default fallback
  return res.json({
    message: "Invalid step. Please start again.",
    next_step: "show_active_orders",
  });
});

app.post("/api/order_delayed", (req, res) => {
  const { current_step, orderId, user_choice } = req.body;

  // Mock orders
  const orders = [
    {
      id: "OD1234",
      items: ["Biscuit Pack", "Soft Drink", "Banana Chips"],
      expectedTime: "7 AM - 7:30 AM",
      updatedTime: "7:45 AM - 8:15 AM",
    },
    {
      id: "OD1235",
      items: ["Milk", "Paneer"],
      expectedTime: "7 AM - 7:30 AM",
      updatedTime: "7:45 AM - 8:15 AM",
    },
  ];

  // Step 1 → Show delayed or possibly delayed orders
  if (current_step === "show_delayed_orders") {
    return res.status(200).json({
      message:
        "We’re sorry that your order hasn’t arrived yet. Here are your active orders that might be delayed:",
      options: orders.map((order) => ({
        title: `Order ID: ${order.id} — ${order.items.join(", ")} (Expected: ${
          order.expectedTime
        })`,
        value: order.id,
      })),
      next_step: "select_delayed_order",
    });
  }

  // Step 2 → Select which order is delayed
  if (current_step === "select_delayed_order") {
    const selectedOrder = orders.find((o) => o.id === orderId);
    if (!selectedOrder) {
      return res.status(404).json({
        message:
          "Sorry, I couldn’t find that order. Please select a valid one.",
        next_step: "show_delayed_orders",
      });
    }

    return res.status(200).json({
      message: `Your order (ID: ${selectedOrder.id}) was expected between ${selectedOrder.expectedTime}.\n\nWe’re noticing a delay due to high traffic or weather conditions.`,
      options: [
        {
          name: "Check updated delivery time",
          id: "check_updated_time",
          next_step: "choose_delay_action",
          category: "order_delayed",
        },
        {
          name: "Report as not delivered",
          id: "report_not_delivered",
          next_step: "choose_delay_action",
          category: "order_delayed",
        },
      ],
    });
  }

  // Step 3 → User chooses what to do next
  if (current_step === "choose_delay_action") {
    if (user_choice === "check_updated_time") {
      const selectedOrder = orders.find((o) => o.id === orderId);
      return res.status(200).json({
        message: `The updated estimated delivery time for Order ID ${orderId} is ${selectedOrder.updatedTime}.\n\nOur delivery partner is on the way.`,
        options: [
          {
            name: "Okay, I’ll wait",
            id: "wait_for_order",
            next_step: "confirm_next_action",
            category: "order_delayed",
          },
          {
            name: "Report issue if not delivered",
            id: "report_not_delivered",
            next_step: "confirm_next_action",
            category: "order_delayed",
          },
        ],
      });
    }

    if (user_choice === "report_not_delivered") {
      return res.status(200).json({
        message:
          "We’ve raised this issue with our support team. You’ll be notified soon.\n\nWould you like to request a call back from customer support?",
        options: [
          {
            name: "📞 Yes, request call back",
            id: "request_callback",
            next_step: "handle_callback_request",
            category: "order_delayed",
          },
          {
            name: "❌ No, I’ll wait for update",
            id: "no_callback",
            next_step: "handle_callback_request",
            category: "order_delayed",
          },
        ],
      });
    }
  }

  // Step 4 → Confirm next action
  if (current_step === "confirm_next_action") {
    const selectedOrder = orders.find((o) => o.id === orderId);
    if (user_choice === "wait_for_order") {
      return res.status(200).json({
        message: `Thank you for your patience! Your delivery partner will reach soon.\n\nIf the order isn’t delivered by ${
          selectedOrder.updatedTime.split("-")[1]
        } please report again.`,
        // options: [
        //   { name: "🏠 Go to main menu", id: "main_menu" },
        //   { title: "📦 Track my order", value: "track_order" },
        // ],
      });
    }

    if (user_choice === "report_not_delivered") {
      return res.status(200).json({
        message:
          "We’ve notified our support team about your delayed order. You’ll get an update shortly.",
        options: [
          { name: "🏠 Back to main menu", id: "main_menu" },
          { name: "📞 Contact  support", id: "cont act_support" },
        ],
      });
    }
  }

  // Step 5 → Handle callback request
  if (current_step === "handle_callback_request") {
    if (user_choice === "request_callback") {
      return res.status(200).json({
        message:
          "✅ Your callback request has been placed. Our customer care executive will contact you soon.",
      });
    } else {
      return res.status(200).json({
        message:
          "Alright! Please wait while we look into your delayed order. You’ll get a notification once it’s out for delivery.",
      });
    }
  }

  // Default fallback
  return res.status(400).json({
    message: "Invalid step. Please restart the order delay process.",
    next_step: "show_delayed_orders",
  });
});

app.get("/api/issue_with_products", (req, res) => {
  return res.status(200).json({
    message: "What issue you are facing with products?",
    options: [
      { id: "wrong_item", name: "Received wrong item" },
      { id: "damaged_item", name: "Received damaged item" },
      { id: "missing_item", name: "Item missing from order" },
      { id: "issue_with_quantity", name: "Quantity issues" },
    ],
  });
});

app.post("/api/damaged_item", (req, res) => {
  const { current_step, orderId } = req.body;
  console.log(orderId);
  const orders = [
    { id: "OD1234", items: ["Milk", "Bread"], status: "Pending" },
    { id: "OD1235", items: ["Biscuit Pack", "Soft Drink"], status: "Pending" },
  ];

  if (current_step === "show_delivered_orders") {
    res.status(200).json({
      message: "please select order",
      options: orders.map((order) => ({
        id: order.id,
        name: `${order.id} - ${order.items.join(", ")}`,
        category: "damaged_item",
        next_step: "show_items",
      })),
    });
  } else if (current_step === "show_items") {
    const { items } = orders.filter((order) => order.id === orderId)[0];

    const options = items.map((item, index) => ({
      id: `#${item}${index}`,
      name: item,
      category: "damaged_item",
      next_step: "show_reasons",
    }));

    res.status(200).json({
      message: "Please choose the item that was damaged",
      options,
    });
  } else if (current_step === "show_reasons") {
    res.status(200).json({
      message: "Please tell us the severity of the damage:",
      options: [
        {
          id: "minor",
          name: "Minor Damage (usable but damaged)",
          category: "damaged_item",
          next_step: "upload_photo",
        },
        {
          id: "medium",
          name: "Partially Damaged (spilled or broken)",
          category: "damaged_item",
          next_step: "upload_photo",
        },
        {
          id: "major",
          name: "Severely Damaged (completely unusable)",
          category: "damaged_item",
          next_step: "upload_photo",
        },
      ],
    });
  } else if (current_step === "upload_photo") {
    res.status(200).json({
      message: "Please upload a photo of the damaged product.",
      options: [
        {
          id: "upload_image",
          name: "Upload Image",
          category: "damaged_item",
          next_step: "choose_resolution",
        },
      ],
    });
  } else if (current_step === "choose_resolution") {
    // return res.status(200).json({
    //   message:
    //     "Please upload a photo of the received wrong item. Once verified, your refund will be processed within 24 hours.",
    //   options: [
    //     {
    //       id: "upload_image",
    //       name: "Upload Photo",
    //       category: "wrong_item",
    //       next_step: "choose_resolution",
    //     },
    //   ],
    // });

    return res.status(200).json({
      message: "How would you like us to resolve this?",
      options: [
        {
          id: "refund",
          name: "Refund (Get money back)",
          category: "damaged_item",
          next_step: "refund_submitted",
        },
        {
          id: "replacement",
          name: "Replacement (Get correct item delivered)",
          category: "damaged_item",
          next_step: "replacement_submitted",
        },
      ],
    });
  } // Step 6A: Refund submission confirmation
  else if (current_step === "refund_submitted") {
    return res.status(200).json({
      message:
        "Refund request submitted. Our team will review and process it shortly. You’ll be notified once approved.",
    });
  }

  // Step 5B: Replacement flow
  else if (current_step === "replacement_instructions") {
    return res.status(200).json({
      message:
        "Please upload a photo of the damaged item received. Once verified, we’ll dispatch the correct item.",
      options: [
        {
          id: "upload_image",
          name: "Upload Photo",
          category: "damaged_item",
          next_step: "replacement_submitted",
        },
      ],
    });
  }

  // Step 6B: Replacement confirmation
  else if (current_step === "replacement_submitted") {
    return res.status(200).json({
      message:
        "Replacement request submitted. The item will be dispatched soon",
    });
  } else {
    res.status(200).json({
      message: "Refund request submitted. You’ll be notified within 24 hours.",
    });
  }
});

app.post("/api/wrong_item", (req, res) => {
  const { current_step, orderId } = req.body;
  console.log(current_step, orderId);

  const orders = [
    { id: "OD1234", items: ["Sunflower Oil", "Bread"], status: "Delivered" },
    { id: "OD1235", items: ["Biscuit Pack", "Soft Drink"], status: "Pending" },
  ];

  // Step 1: Show delivered orders
  if (current_step === "show_delivered_orders") {
    return res.status(200).json({
      message: "Please select the order where you received the wrong item:",
      options: orders.map((order) => ({
        id: order.id,
        name: `${order.id} - ${order.items.join(", ")}`,
        category: "wrong_item",
        next_step: "show_items",
      })),
    });
  }

  // Step 2: Show items in that order
  else if (current_step === "show_items") {
    const order = orders.find((o) => o.id === orderId);
    if (!order) return res.status(404).json({ message: "Order not found" });

    const options = order.items.map((item, index) => ({
      id: `#${item}${index}`,
      name: item,
      category: "wrong_item",
      next_step: "confirm_wrong_item",
    }));

    return res.status(200).json({
      message: "Select the item that was received incorrectly:",
      options,
    });
  }

  // Step 3: Confirm wrong item details
  else if (current_step === "confirm_wrong_item") {
    return res.status(200).json({
      message: "Please tell us what you received instead:",
      options: [
        {
          id: "enter_wrong_item_name",
          name: "Type wrong item name",
          category: "wrong_item",
          next_step: "refund_instructions",
        },
      ],
    });
  }

  // Step 4: Choose resolution (Refund or Replacement)
  else if (current_step === "upload_image") {
    return res.status(200).json({
      message:
        "Please upload a photo of the received wrong item. Once verified, it will be processed within 2 hours.",
      options: [
        {
          id: "upload_image",
          name: "Upload Photo",
          category: "wrong_item",
          next_step: "choose_resolution",
        },
      ],
    });
  }

  // Step 5A: Refund flow
  else if (current_step === "choose_resolution") {
    // return res.status(200).json({
    //   message:
    //     "Please upload a photo of the received wrong item. Once verified, your refund will be processed within 24 hours.",
    //   options: [
    //     {
    //       id: "upload_image",
    //       name: "Upload Photo",
    //       category: "wrong_item",
    //       next_step: "choose_resolution",
    //     },
    //   ],
    // });

    return res.status(200).json({
      message: "How would you like us to resolve this?",
      options: [
        {
          id: "refund",
          name: "Refund (Get money back)",
          category: "wrong_item",
          next_step: "refund_submitted",
        },
        {
          id: "replacement",
          name: "Replacement (Get correct item delivered)",
          category: "wrong_item",
          next_step: "replacement_submitted",
        },
      ],
    });
  }

  // Step 6A: Refund submission confirmation
  else if (current_step === "refund_submitted") {
    return res.status(200).json({
      message:
        "Refund request submitted. Our team will review and process it shortly. You’ll be notified once approved.",
    });
  }

  // Step 5B: Replacement flow
  else if (current_step === "replacement_instructions") {
    return res.status(200).json({
      message:
        "Please upload a photo of the wrong item received. Once verified, we’ll dispatch the correct item.",
      options: [
        {
          id: "upload_image",
          name: "Upload Photo",
          category: "wrong_item",
          next_step: "replacement_submitted",
        },
      ],
    });
  }

  // Step 6B: Replacement confirmation
  else if (current_step === "replacement_submitted") {
    return res.status(200).json({
      message:
        "Replacement request submitted. The correct item will be dispatched soon. Please keep the wrong item ready for pickup.",
    });
  }

  // Default fallback
  else {
    return res.status(400).json({
      message: "Invalid step or missing current_step parameter.",
    });
  }
});

app.post("/api/missing_item", (req, res) => {
  const {
    current_step,
    orderId,
    missing_items,
    resolution_choice,
    confirm_report,
  } = req.body;

  // Mock delivered orders
  const deliveredOrders = [
    {
      id: "OD1235",
      items: ["Oreo biscuit packet", "Coke", "Banana Chips"],
      deliveredAt: "Today, 10:45 AM",
    },
    {
      id: "OD7002",
      items: ["Bread", "Eggs", "Butter"],
      deliveredAt: "Yesterday, 6:15 PM",
    },
  ];

  // Step 1 → Show delivered orders
  if (current_step === "show_delivered_orders") {
    return res.status(200).json({
      message: "Please select the order where an item is missing:",
      options: deliveredOrders.map((order) => ({
        title: `Order ID: ${order.id} — ${order.items.join(
          ", "
        )} (Delivered at ${order.deliveredAt})`,
        value: order.id,
      })),
      next_step: "select_order",
    });
  }

  // Step 2 → User selects order
  if (current_step === "select_order") {
    const selectedOrder = deliveredOrders.find((o) => o.id === orderId);
    // if (!selectedOrder) {
    //   return res.status(404).json({
    //     message: "Sorry, that order wasn’t found. Please select a valid order.",
    //     next_step: "show_delivered_orders",
    //   });
    // }

    return res.status(200).json({
      message: `You selected Order ID ${selectedOrder.id}.\n\nPlease select the missing item:`,
      options: selectedOrder.items.map((item) => ({
        id: item,
        name: item,
        multi_select: true,
        category: "missing_item",
        next_step: "select_missing_items",
      })),
    });
  }

  // Step 3 → User selects missing items
  if (current_step === "select_missing_items") {
    // if (!missing_items || missing_items.length === 0) {
    //   return res.status(400).json({
    //     message: "Please select at least one missing item.",
    //     next_step: "select_missing_items",
    //   });
    // }

    return res.status(200).json({
      message: `You reported that the following item is missing: ${missing_items.join(
        ", "
      )}.\n\nHow would you like us to resolve this?`,
      options: [
        {
          name: "💰 Refund for missing item",
          id: "refund",
          next_step: "select_resolution",
          category: "missing_item",
        },
        {
          name: "📦 Replacement for missing item",
          id: "replacement",
          next_step: "select_resolution",
          category: "missing_item",
        },
      ],
    });
  }

  // Step 4 → User selects resolution type
  if (current_step === "select_resolution") {
    // if (!resolution_choice) {
    //   return res.status(400).json({
    //     message: "Please select whether you want a refund or replacement.",
    //     next_step: "select_resolution",
    //   });
    // }

    const resolutionText =
      resolution_choice === "refund" ? "a refund" : "replacement of the item";

    return res.status(200).json({
      message: `You chose ${resolutionText} for the missing item(s).\nWould you like to confirm this request?`,
      options: [
        {
          name: "✅ Yes, confirm",
          id: "confirm_report",
          next_step: "confirm_report",
          category: "missing_item",
        },
        {
          name: "❌ No, cancel",
          id: "cancel_report",
          next_step: "cancel_report",
          category: "missing_item",
        },
      ],
    });
  }

  // Step 5 → Confirm submission
  if (current_step === "confirm_report") {
    return res.status(200).json({
      message: `✅ Your report for missing item has been submitted successfully.\nOur team will process ${
        resolution_choice === "refund" ? "the refund" : "a replacement"
      } within 24 hours.`,
    });
  }

  if (confirm_report === "cancel_report") {
    return res.status(200).json({
      message:
        "No problem! The issue has not been reported. You can report it later if needed.",
    });
  }

  // Default fallback
  return res.status(400).json({
    message: "Invalid step. Please restart the missing item flow.",
    next_step: "show_delivered_orders",
  });
});

app.post("/api/issue_with_quantity", (req, res) => {
  const {
    current_step,
    orderId,
    item_with_issue,
    resolution_choice,
    confirm_report,
    received_quantity,
  } = req.body;
  console.log(current_step);

  // Mock delivered orders
  const deliveredOrders = [
    {
      id: "OD1235",
      items: ["Rice (5kg)", "Bananas (1 dozen)", "Oil (1L)"],
      deliveredAt: "Today, 11:00 AM",
    },
    {
      id: "OD8102",
      items: ["Bread", "Eggs (6 pcs)", "Butter (500g)"],
      deliveredAt: "Yesterday, 6:30 PM",
    },
  ];

  // Step 1 → Show delivered orders
  if (current_step === "show_delivered_orders") {
    return res.status(200).json({
      message: "Please select the order where you received less quantity:",
      options: deliveredOrders.map((order) => ({
        title: `Order ID: ${order.id} — ${order.items.join(
          ", "
        )} (Delivered at ${order.deliveredAt})`,
        value: order.id,
      })),
      next_step: "select_order",
    });
  }

  // Step 2 → Select order
  if (current_step === "select_order") {
    const selectedOrder = deliveredOrders.find((o) => o.id === orderId);
    // if (!selectedOrder) {
    //   return res.status(404).json({
    //     message: "Sorry, that order wasn’t found. Please select a valid order.",
    //     next_step: "show_delivered_orders",
    //   });
    // }

    return res.status(200).json({
      message: `You selected Order ID ${selectedOrder.id}.\n\nPlease select the item that has less quantity:`,
      options: selectedOrder.items.map((item) => ({
        name: item,
        id: item,
        category: "issue_with_quantity",
        next_step: "select_item_with_issue",
      })),
    });
  }

  // Step 3 → Select item
  if (current_step === "select_item_with_issue") {
    // if (!item_with_issue) {
    //   return res.status(400).json({
    //     message: "Please select the item with the quantity issue.",
    //     next_step: "select_item_with_issue",
    //   });
    // }

    return res.status(200).json({
      message: `You selected "${item_with_issue}".\n\nPlease enter the quantity you actually received?`,
      options: [
        {
          id: "enter_quantity",
          name: "Enter quantity",
          next_step: "enter_received_quantity",
          category: "issue_with_quantity",
        },
      ],
    });
  }

  //  Step 4 → Enter received quantity
  if (current_step === "enter_received_quantity") {
    // if (!received_quantity || received_quantity.trim() === "") {
    //   return res.status(400).json({
    //     message: "Please enter the quantity you actually received.",
    //     next_step: "enter_received_quantity",
    //   });
    // }

    return res.status(200).json({
      message: `Got it! You received "${received_quantity}" for "${item_with_issue}".\n\nHow would you like us to resolve this issue?`,
      options: [
        {
          name: "💰 Refund for missing quantity",
          id: "refund",
          next_step: "select_resolution",
          category: "issue_with_quantity",
        },
        {
          name: "📦 Replacement for missing quantity",
          id: "replacement",
          next_step: "select_resolution",
          category: "issue_with_quantity",
        },
      ],
    });
  }

  // Step 4 → Select resolution
  if (current_step === "select_resolution") {
    // if (!resolution_choice) {
    //   return res.status(400).json({
    //     message: "Please select whether you want a refund or replacement.",
    //     next_step: "select_resolution",
    //   });
    // }

    return res.status(200).json({
      message: `You chose "${
        resolution_choice === "refund" ? "Refund" : "Replacement"
      }" for "${item_with_issue}".\nWould you like to confirm this request?`,
      options: [
        {
          name: "✅ Yes, confirm",
          id: "confirm_report",
          next_step: "confirm_report",
          category: "issue_with_quantity",
        },
        {
          name: "❌ No, cancel",
          id: "cancel_report",
          next_step: "cancel_report",
          category: "issue_with_quantity",
        },
      ],
    });
  }

  // Step 5 → Confirm report
  if (current_step === "confirm_report") {
    const resolutionMessage =
      resolution_choice === "refund"
        ? "We’ll process your refund within 24 hours."
        : "We’ll arrange a replacement for the missing quantity shortly.";

    return res.status(200).json({
      message: `✅ Your report for quantity issue has been submitted successfully.\n${resolutionMessage}`,
    });
  }

  if (confirm_report === "cancel_report") {
    return res.status(200).json({
      message:
        "No problem! The issue has not been reported. You can report it later if needed.",
    });
  }

  // Default fallback
  return res.status(400).json({
    message: "Invalid step. Please restart the quantity issue flow.",
    next_step: "show_delivered_orders",
  });
});

app.post("/api/issue_with_delivery_partner", (req, res) => {
  const { current_step, orderId, selected_issue, confirm_report } = req.body;

  // Mock delivered orders
  const deliveredOrders = [
    {
      id: "OD1235",
      items: ["Rice", "Dal", "Tomatoes"],
      deliveredAt: "Today, 4:30 PM",
      partnerName: "Ravi",
    },
    {
      id: "OD5002",
      items: ["Bread", "Eggs", "Juice"],
      deliveredAt: "Yesterday, 7:15 PM",
      partnerName: "Suresh",
    },
  ];

  // Common issue options
  const issues = [
    {
      id: "rude_behavior",
      title: "Delivery partner was rude or unprofessional",
    },
    { id: "late_delivery", title: "Delivery partner delivered very late" },
    {
      id: "asked_extra_money",
      title: "Delivery partner asked for extra money",
    },
    {
      id: "did_not_follow_instructions",
      title: "Did not follow delivery instructions",
    },
    { id: "other_issue", title: "Something else" },
  ];

  // Step 1 → Show delivered orders
  if (current_step === "show_delivered_orders") {
    return res.status(200).json({
      message:
        "Please select the order where you faced an issue with the delivery partner:",
      options: deliveredOrders.map((order) => ({
        title: `Order ID: ${order.id} — ${order.items.join(
          ", "
        )} (Delivered by ${order.partnerName} at ${order.deliveredAt})`,
        value: order.id,
      })),
      next_step: "select_order",
    });
  }

  // Step 2 → Select order
  if (current_step === "select_order") {
    const selectedOrder = deliveredOrders.find((o) => o.id === orderId);
    if (!selectedOrder) {
      return res.status(404).json({
        message: "Sorry, that order wasn’t found. Please choose a valid order.",
        next_step: "show_delivered_orders",
      });
    }

    return res.status(200).json({
      message: `Please tell us what issue you faced:`,
      options: issues.map((issue) => ({
        name: issue.title,
        id: issue.id,
        next_step: "select_issue",
        category: "issue_with_delivery_partner",
      })),
    });
  }

  // Step 3 → Select issue
  if (current_step === "select_issue") {
    const selectedIssue = issues.find((i) => i.id === selected_issue);
    // if (!selectedIssue) {
    //   return res.status(400).json({
    //     message: "Please select a valid issue.",
    //     options: issues.map((issue) => ({
    //       title: issue.title,
    //       value: issue.id,
    //     })),
    //     next_step: "select_issue",
    //   });
    // }

    if (selected_issue === "other_issue") {
      return res.status(200).json({
        message:
          "Please describe briefly what issue you faced with the delivery partner:",
        input: true, // 👈 indicates front-end should show a text input box
        next_step: "collect_description",
      });
    }

    return res.status(200).json({
      message: `You selected: "${selectedIssue.title}".\n\nWould you like to report this issue to our support team?`,
      options: [
        {
          name: "✅ Yes, report it",
          id: "confirm_report",
          next_step: "confirm_report",
          category: "issue_with_delivery_partner",
        },
        {
          name: "❌ No, go back",
          id: "cancel_report",
          next_step: "cancel_report",
          category: "issue_with_delivery_partner",
        },
      ],
    });
  }

  // Step 4 → Collect custom description (if "other_issue")
  if (current_step === "collect_description") {
    return res.status(200).json({
      message:
        "Thank you for sharing the details. Would you like to submit this report to our support team?",
      options: [
        {
          name: "✅ Yes, submit",
          id: "confirm_report",
          category: "issue_with_delivery_partner",
          next_step: "confirm_report",
        },
        {
          name: "❌ No, go back",
          id: "cancel_report",
          category: "issue_with_delivery_partner",
          next_step: "cancel_report",
        },
      ],
    });
  }

  // Step 5 → Confirm report
  if (current_step === "confirm_report") {
    return res.status(200).json({
      message: `✅ Your issue has been successfully reported to our support team. We’ll review the case and take appropriate action against the delivery partner.\n\nThank you for helping us improve your experience.`,
    });
  }

  if (current_step === "cancel_report") {
    return res.status(200).json({
      message:
        "No problem! The issue has not been reported. If you face this problem again, please let us know.",
    });
  }

  // Default fallback
  return res.status(400).json({
    message: "Invalid step. Please restart the delivery partner issue process.",
    next_step: "show_delivered_orders",
  });
});

app.get("/api/issue_with_delivery_partner", (req, res) => {
  return res.status(200).json({
    message: "What issue did you face with delivery partner?",
    options: [{ id: "delivery_boy_behaviour", name: "Delivey boy behaviour " }],
  });
});

//order returend

app.post("/api/reschedule_pickup", (req, res) => {
  const { current_step, orderId, selectedSlot } = req.body;

  // Mock data
  const orders = [
    { id: "OD1234", item: "Bread", status: "Return Scheduled" },
    { id: "OD1235", item: "Milk", status: "Pickup Pending" },
  ];

  // 🟩 STEP 1: Show delivered/return orders eligible for pickup reschedule
  if (current_step === "show_orders") {
    return res.status(200).json({
      message: "Here are your orders eligible for pickup reschedule:",
      orders,
      next_step: "select_order",
    });
  }

  // 🟩 STEP 2: Ask for preferred date
  if (current_step === "select_order") {
    return res.status(200).json({
      message: `Please select a new date for pickup of Order ${orderId}.`,
      options: [
        { id: "24_oct", name: "24 Oct 2025" },
        { id: "25_oct", name: "25 Oct 2025" },
        { id: "26_oct", name: "26 Oct 2025" },
      ],
      next_step: "select_date",
    });
  }

  // 🟩 STEP 3: Ask for preferred time slot
  if (current_step === "select_time_slot") {
    return res.status(200).json({
      message: "Please select a available time slot for pickup.",
      options: [
        {
          id: "9_11am",
          name: "9 AM - 11 AM",
          next_step: "choose_confirmation",
          category: "reschedule_pickup",
        },
        {
          id: "12_2pm",
          name: "12 PM - 2 PM",
          next_step: "choose_confirmation",
          category: "reschedule_pickup",
        },
        {
          id: "4_6pm",
          name: "4 PM - 6 PM",
          next_step: "choose_confirmation",
          category: "reschedule_pickup",
        },
        {
          id: "customized_time_slot",
          name: "Customized time slot",
          next_step: "choose_confirmation",
          category: "reschedule_pickup",
        },
      ],
    });
  }

  // 🟩 STEP 4: Confirm new pickup time
  if (current_step === "choose_confirmation") {
    return res.status(200).json({
      message: `You've selected pickup slot ${selectedSlot}. Would you like to confirm this reschedule?`,
      options: [
        {
          id: "confirm_reschedule",
          name: "Yes, confirm pickup reschedule",
          next_step: "confirm_reschedule",
          category: "reschedule_pickup",
        },
        {
          id: "cancel_reschedule",
          name: "No, keep existing schedule",
          next_step: "cancel_reschedule",
          category: "reschedule_pickup",
        },
      ],
    });
  }

  // 🟩 STEP 5: Handle confirmation
  if (current_step === "confirm_reschedule") {
    return res.status(200).json({
      message: `Your pickup for Order ${orderId} has been successfully rescheduled to ${selectedSlot}. Our partner will reach you at that time.`,
    });
  }

  // 🟩 STEP 6: Handle cancellation
  if (current_step === "cancel_reschedule") {
    return res.status(200).json({
      message: "No problem! Your existing pickup schedule remains unchanged.",
    });
  }

  // 🟥 Invalid step
  return res.status(400).json({ message: "Invalid current_step" });
});

app.post("/api/replacement_queries", (req, res) => {
  const { current_step, orderId, issue_type, selectedSlot, confirm } = req.body;

  console.log(current_step);
  // Mock replacement data
  const replacementOrders = [
    {
      id: "OD1234",
      item: "Amul Milk 1L",
      status: "Replacement In Transit",
      expected_delivery: "28 Oct 2025",
      pickup_status: "Completed",
      refund_status: "Not Applicable",
    },
    {
      id: "OD1235",
      item: "Brown Bread",
      status: "Pickup Pending",
      expected_delivery: null,
      pickup_status: "Pending",
      refund_status: "Processing",
    },
  ];

  // Step 1: Show orders with active or completed replacements
  if (current_step === "show_replacement_orders") {
    return res.status(200).json({
      message: "Here are your orders with replacement or exchange activity:",
      orders: replacementOrders.map((o) => ({
        id: o.id,
        item: o.item,
        status: o.status,
      })),
      next_step: "select_order",
    });
  }

  // Step 2: Ask what issue the customer is facing after replacement
  if (current_step === "select_order") {
    return res.status(200).json({
      message: `What issue are you facing with your replacement order ${orderId}?`,
      options: [
        { id: "track_status", name: "Track replacement status" },
        { id: "delay_in_replacement", name: "Replacement delayed" },
        { id: "pickup_not_done", name: "Pickup not done yet" },
        { id: "reschedule_pickup", name: "Reschedule pickup" },
        { id: "not_received", name: "Didn’t receive replacement item" },
        { id: "cancel_replacement", name: "Cancel replacement request" },
      ],
    });
  }

  // Step 3: Handle replacement tracking
  if (current_step === "track_status" || issue_type === "track_status") {
    const order = replacementOrders.find((o) => o.id === orderId);
    if (!order) return res.status(404).json({ message: "Order not found" });

    return res.status(200).json({
      message: `Your replacement for ${order.item} is currently "${
        order.status
      }" 🚚. Expected delivery by ${order.expected_delivery || "TBD"}.`,
      options: [
        {
          id: "reschedule_pickup",
          name: "Reschedule pickup",
          next_step: "reschedule_pickup",
          category: "replacement_queries",
        },
        {
          id: "cancel_replacement",
          name: "Cancel replacement",
          // next_step: "cancel_replacement",
          category: "replacement_queries",
        },
      ],
    });
  }

  // Step 4: Handle delay in replacement
  if (current_step === "delay_in_replacement") {
    return res.status(200).json({
      message:
        "We’re sorry your replacement is delayed. Due to high demand or logistics issues, it might take another 24–48 hours. Would you like us to notify you once it’s dispatched?",
      options: [
        {
          id: "yes_notify",
          name: "Yes, notify me",
          next_step: "confirm_notification",
          category: "replacement_queries",
        },
        {
          id: "no_thanks",
          name: "No, that’s okay",
          next_step: "confirm_notification",
          category: "replacement_queries",
        },
      ],
    });
  }

  // Step 5: Pickup not done yet
  if (current_step === "pickup_not_done") {
    return res.status(200).json({
      message:
        "We’re sorry your pickup hasn’t been done yet. You can reschedule your pickup to a convenient slot:",
      options: [
        {
          id: "slot1",
          name: "9 AM - 11 AM",
          next_step: "reschedule_pickup_slot",
          category: "replacement_queries",
        },
        {
          id: "slot2",
          name: "12 PM - 2 PM",
          next_step: "reschedule_pickup_slot",
          category: "replacement_queries",
        },
        {
          id: "slot3",
          name: "4 PM - 6 PM",
          next_step: "reschedule_pickup_slot",
          category: "replacement_queries",
        },
        {
          id: "customized_time_slot",
          name: "Customized time slot",
          next_step: "reschedule_pickup_slot",
          category: "replacement_queries",
        },
      ],
    });
  }

  // STEP 15: Confirm delay or refund notification
  if (
    current_step === "confirm_notification" ||
    current_step === "confirm_refund_notification"
  ) {
    if (confirm === "yes_notify" || confirm === "yes_notify_refund") {
      return res.status(200).json({
        message:
          "Got it! We’ll notify you via SMS or email once there’s an update.",
      });
    } else {
      return res.status(200).json({
        message:
          "Alright! You can always check your replacement or refund status from the 'My Orders' section.",
      });
    }
  }

  // Step 6: Reschedule pickup
  if (current_step === "reschedule_pickup") {
    return res.status(200).json({
      message: "Please select a new pickup slot:",
      options: [
        {
          id: "slot1",
          name: "9 AM - 11 AM",
          next_step: "reschedule_pickup_slot",
          category: "replacement_queries",
        },
        {
          id: "slot2",
          name: "12 PM - 2 PM",
          next_step: "reschedule_pickup_slot",
          category: "replacement_queries",
        },
        {
          id: "slot3",
          name: "4 PM - 6 PM",
          next_step: "reschedule_pickup_slot",
          category: "replacement_queries",
        },
        {
          id: "customized_time_slot",
          name: "Customized time slot",
          next_step: "reschedule_pickup_slot",
          category: "replacement_queries",
        },
      ],
    });
  }

  // Step 7: Confirm reschedule success
  if (current_step === "reschedule_pickup_slot") {
    return res.status(200).json({
      message: `Pickup has been successfully rescheduled to ${selectedSlot}.`,
    });
  }

  // Step 8: Replacement not received
  if (current_step === "not_received") {
    return res.status(200).json({
      message:
        "We apologize for the delay. Your replacement is in transit and should reach you within 24 hours. If not received, refund will be initiated automatically.",
    });
  }

  // Step 12: Cancel replacement request
  if (current_step === "cancel_replacement") {
    return res.status(200).json({
      message: "Are you sure you want to cancel your replacement request?",
      options: [
        {
          id: "yes_cancel_replacement",
          name: "✅ Yes, cancel replacement",
          next_step: "confirm_cancel_replacement",
          category: "replacement_queries",
        },
        {
          id: "no_keep_replacement",
          name: "❌ No, keep it active",
          next_step: "confirm_cancel_replacement",
          category: "replacement_queries",
        },
      ],
    });
  }

  if (current_step === "confirm_cancel_replacement") {
    if (confirm === "yes_cancel_replacement") {
      return res.status(200).json({
        message: `Your replacement request for order ${orderId} has been cancelled successfully. Any refund (if applicable) will be credited within 5–7 business days.`,
      });
    }

    if (confirm === "no_keep_replacement") {
      return res.status(200).json({
        message:
          "No worries! Your replacement request remains active. You’ll be notified once it’s dispatched.",
      });
    }
  }

  // Fallback
  return res
    .status(400)
    .json({ message: "Invalid current_step or missing parameters." });
});

// app.post("/api/wrong_item", (req, res) => {
//   const { current_step, orderId, selected_item } = req.body;

//   // Step 1: Show delivered orders
//   if (current_step === "show_delivered_orders") {
//     return res.status(200).json({
//       message: "Select the order with wrong item:",
//       options: [
//         {
//           id: "OD1234",
//           name: "OD1234 - Sunflower Oil, Bread",
//           category: "wrong_item",
//           next_step: "show_items",
//         },
//         {
//           id: "OD1235",
//           name: "OD1235 - Eggs, Milk",
//           category: "wrong_item",
//           next_step: "show_items",
//         },
//       ],
//     });
//   }

//   // Step 2: Show items for selected order
//   else if (current_step === "show_items") {
//     if (orderId === "OD1234") {
//       return res.status(200).json({
//         message: "Which item was wrong?",
//         options: [
//           {
//             id: "oil",
//             name: "Sunflower Oil",
//             category: "wrong_item",
//             next_step: "specify_wrong_item",
//           },
//           {
//             id: "bread",
//             name: "Bread",
//             category: "wrong_item",
//             next_step: "specify_wrong_item",
//           },
//         ],
//       });
//     } else {
//       return res.status(200).json({
//         message: "Which item was wrong?",
//         options: [
//           {
//             id: "eggs",
//             name: "Eggs",
//             category: "wrong_item",
//             next_step: "specify_wrong_item",
//           },
//           {
//             id: "milk",
//             name: "Milk",
//             category: "wrong_item",
//             next_step: "specify_wrong_item",
//           },
//         ],
//       });
//     }
//   }

//   // Step 3: Specify wrong item details
//   else if (current_step === "specify_wrong_item") {
//     return res.status(200).json({
//       message: "What did you receive instead?",
//       options: [
//         {
//           id: "enter_details",
//           name: "Type wrong item name",
//           category: "wrong_item",
//           next_step: "choose_resolution",
//         },
//       ],
//     });
//   }

//   // Step 4: Choose resolution
//   else if (current_step === "choose_resolution") {
//     return res.status(200).json({
//       message: "How would you like us to fix this?",
//       options: [
//         {
//           id: "instant_refund",
//           name: "Instant Refund ₹12.99 + ₹5 bonus",
//           description: "Get refund now with bonus credit",
//           category: "wrong_item",
//           next_step: "refund_processing",
//         },
//         {
//           id: "replacement",
//           name: "Free Replacement + ₹50 credit",
//           description: "Get correct item delivered today",
//           category: "wrong_item",
//           next_step: "replacement_processing",
//         },
//         {
//           id: "credit_plus",
//           name: "₹14.29 Store Credit (10% extra)",
//           description: "Extra credit for next order",
//           category: "wrong_item",
//           next_step: "credit_processing",
//         },
//       ],
//     });
//   }

//   // Step 5A: Refund processing
//   else if (current_step === "refund_processing") {
//     return res.status(200).json({
//       message: "Upload photo (optional):",
//       options: [
//         {
//           id: "upload_photo",
//           name: "Upload Photo",
//           category: "wrong_item",
//           next_step: "refund_complete",
//         },
//         {
//           id: "skip_photo",
//           name: "Skip and proceed",
//           category: "wrong_item",
//           next_step: "refund_complete",
//         },
//       ],
//     });
//   }

//   // Step 6A: Refund complete
//   else if (current_step === "refund_complete") {
//     return res.status(200).json({
//       message:
//         "✅ Refund approved! ₹17.99 credited to your wallet. Use it for your next order.",
//       case_id: "CASE-12345",
//       resolution: {
//         refund_amount: 12.99,
//         bonus_credit: 5.0,
//         total: 17.99,
//         processing_time: "Immediate",
//       },
//       options: [
//         {
//           id: "track_status",
//           name: "Track Resolution",
//           category: "navigation",
//           next_step: "track_status",
//         },
//         {
//           id: "contact_support",
//           name: "Contact Support",
//           category: "support",
//           next_step: "contact_support",
//         },
//       ],
//     });
//   }

//   // Step 5B: Replacement processing
//   else if (current_step === "replacement_processing") {
//     return res.status(200).json({
//       message: "Replacement scheduled! What about the wrong item?",
//       options: [
//         {
//           id: "pickup",
//           name: "Pickup with delivery",
//           description: "We'll collect wrong item when delivering replacement",
//           category: "wrong_item",
//           next_step: "replacement_complete",
//         },
//         {
//           id: "keep",
//           name: "Keep wrong item",
//           description: "No need to return it",
//           category: "wrong_item",
//           next_step: "replacement_complete",
//         },
//       ],
//     });
//   }

//   // Step 6B: Replacement complete
//   else if (current_step === "replacement_complete") {
//     return res.status(200).json({
//       message:
//         "✅ Replacement confirmed! Correct item will arrive in 2-4 hours. ₹50 credit added for inconvenience.",
//       case_id: "CASE-12346",
//       delivery_eta: "2-4 hours",
//       compensation: "₹50 wallet credit",
//       options: [
//         {
//           id: "track_delivery",
//           name: "Track Delivery",
//           category: "navigation",
//           next_step: "track_delivery",
//         },
//       ],
//     });
//   }

//   // Step 5C: Credit processing
//   else if (current_step === "credit_processing") {
//     return res.status(200).json({
//       message: "Credit processing:",
//       options: [
//         {
//           id: "process_credit",
//           name: "Confirm Credit",
//           category: "wrong_item",
//           next_step: "credit_complete",
//         },
//       ],
//     });
//   }

//   // Step 6C: Credit complete
//   else if (current_step === "credit_complete") {
//     return res.status(200).json({
//       message:
//         "✅ ₹14.29 credit added to your account! 10% bonus for the inconvenience.",
//       case_id: "CASE-12347",
//       credit_amount: 14.29,
//       options: [
//         {
//           id: "shop_now",
//           name: "Shop Now with Credit",
//           category: "navigation",
//           next_step: "shop_now",
//         },
//       ],
//     });
//   }

//   // Step 7: Track status
//   else if (current_step === "track_status") {
//     return res.status(200).json({
//       message: "Resolution Status: COMPLETED",
//       status_updates: [
//         "Request received - 2:30 PM",
//         "Approved automatically - 2:31 PM",
//         "₹17.99 credited to wallet - 2:31 PM",
//       ],
//       options: [
//         {
//           id: "back_home",
//           name: "Back to Home",
//           category: "navigation",
//           next_step: "home",
//         },
//       ],
//     });
//   }

//   // Step 8: Contact support
//   else if (current_step === "contact_support") {
//     return res.status(200).json({
//       message: "Contact support:",
//       options: [
//         {
//           id: "live_chat",
//           name: "Live Chat (2 min wait)",
//           category: "support",
//           next_step: "chat_started",
//         },
//         {
//           id: "callback",
//           name: "Request Callback",
//           category: "support",
//           next_step: "callback_scheduled",
//         },
//         {
//           id: "phone",
//           name: "Call +1-800-HELP-NOW",
//           category: "support",
//           next_step: "phone_call",
//         },
//       ],
//     });
//   }

//   // Step 9: Support responses
//   else if (current_step === "chat_started") {
//     return res.status(200).json({
//       message:
//         "Connected to support agent: Hi! I'm here to help with your wrong item issue.",
//       options: [
//         {
//           id: "type_message",
//           name: "Type your message...",
//           category: "support",
//           next_step: "chat_continue",
//         },
//       ],
//     });
//   } else if (current_step === "callback_scheduled") {
//     return res.status(200).json({
//       message:
//         "✅ Callback scheduled! We'll call you within 15 minutes at your registered number.",
//       options: [
//         {
//           id: "back_home",
//           name: "Back to Home",
//           category: "navigation",
//           next_step: "home",
//         },
//       ],
//     });
//   }

//   // Default
//   else {
//     return res.status(200).json({
//       message: "Let's resolve your wrong item issue:",
//       options: [
//         {
//           id: "start_here",
//           name: "Report Wrong Item",
//           category: "wrong_item",
//           next_step: "show_delivered_orders",
//         },
//       ],
//     });
//   }
// });

// app.get("/api/resolution-status/:caseId", (req, res) => {
//   const { caseId } = req.params;

//   // Mock status response
//   res.json({
//     case_id: caseId,
//     status: "completed",
//     resolution_type: "refund",
//     amount: 12.99,
//     processed_at: new Date().toISOString(),
//     customer_satisfaction: "high",
//   });
// });

app.listen(PORT, () => {
  console.log(`server listening on http://localhost:${PORT}`);
});
