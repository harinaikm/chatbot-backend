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
        id: "cancel_order",
        name: "Cancel Order",
        category: "orders_related",
      },
      {
        id: "order_status",
        name: "Order Status",
        category: "orders_related",
      },
      {
        id: "issue_placing_order",
        name: "Issue Placing Order",
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
      message: "Your order #OD1234 will be delivered in 3 mins.",
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
        id: "late_delivery",
        name: "Order Delayed",
        category: "return_replacement",
      },
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
    { id: "OD1234", items: ["Milk", "Bread"], status: "Pending" },
    { id: "OD1235", items: ["Eggs"], status: "Pending" },
  ]);
});

app.post("/api/damaged_item", (req, res) => {
  const { current_step, orderId } = req.body;
  console.log(current_step, orderId);
  const orders = [
    { id: "OD1234", items: ["Milk", "Bread"], status: "Pending" },
    { id: "OD1235", items: ["Eggs"], status: "Pending" },
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
      message: "Please choose item",
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
          next_step: "request_status",
        },
      ],
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
    { id: "OD1235", items: ["Eggs", "Milk"], status: "Delivered" },
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
          next_step: "choose_resolution",
        },
      ],
    });
  }

  // Step 4: Choose resolution (Refund or Replacement)
  else if (current_step === "choose_resolution") {
    return res.status(200).json({
      message: "How would you like us to resolve this?",
      options: [
        {
          id: "refund",
          name: "Refund (Get money back)",
          category: "wrong_item",
          next_step: "refund_instructions",
        },
        {
          id: "replacement",
          name: "Replacement (Get correct item delivered)",
          category: "wrong_item",
          next_step: "replacement_instructions",
        },
      ],
    });
  }

  // Step 5A: Refund flow
  else if (current_step === "refund_instructions") {
    return res.status(200).json({
      message:
        "Please upload a photo of the received wrong item. Once verified, your refund will be processed within 24 hours.",
      options: [
        {
          id: "upload_image",
          name: "Upload Photo",
          category: "wrong_item",
          next_step: "refund_submitted",
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
