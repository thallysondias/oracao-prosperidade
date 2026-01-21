purchase_data

{
  "id": "evt_1SroP4BTq5zaRnxJikwTLAM3",
  "data": {
    "object": {
      "id": "cs_live_a1zOHSfHWaxP8K3p1LVmXWlTBzALqIyGctkiGsKsa7SW7oYZy0AApRiGhY",
      "url": null,
      "mode": "subscription",
      "locale": "auto",
      "object": "checkout.session",
      "status": "complete",
      "consent": null,
      "created": 1768951763,
      "invoice": "in_1SroP1BTq5zaRnxJZDraduS0",
      "ui_mode": "hosted",
      "currency": "usd",
      "customer": "cus_TpTL6kxVjlhFht",
      "livemode": true,
      "metadata": {},
      "discounts": [],
      "cancel_url": "https://stripe.com",
      "expires_at": 1769038163,
      "custom_text": {
        "submit": null,
        "after_submit": null,
        "shipping_address": null,
        "terms_of_service_acceptance": null
      },
      "permissions": null,
      "submit_type": "donate",
      "success_url": "https://stripe.com",
      "amount_total": 2188,
      "payment_link": "plink_1SWjCYBTq5zaRnxJrLFRWd23",
      "setup_intent": null,
      "subscription": "sub_1SroP3BTq5zaRnxJTECn3nrC",
      "automatic_tax": {
        "status": "complete",
        "enabled": true,
        "provider": "stripe",
        "liability": {
          "type": "self"
        }
      },
      "client_secret": null,
      "custom_fields": [],
      "shipping_cost": null,
      "total_details": {
        "amount_tax": 0,
        "amount_discount": 0,
        "amount_shipping": 0
      },
      "customer_email": null,
      "origin_context": null,
      "payment_intent": null,
      "payment_status": "paid",
      "recovered_from": null,
      "wallet_options": null,
      "amount_subtotal": 2188,
      "adaptive_pricing": {
        "enabled": true
      },
      "after_expiration": null,
      "customer_account": null,
      "customer_details": {
        "name": "diridiana cancino",
        "email": "adalet2023@gmail.com",
        "phone": null,
        "address": {
          "city": null,
          "line1": null,
          "line2": null,
          "state": null,
          "country": "MX",
          "postal_code": null
        },
        "tax_ids": [],
        "tax_exempt": "none",
        "business_name": null,
        "individual_name": null
      },
      "invoice_creation": null,
      "shipping_options": [],
      "customer_creation": "if_required",
      "consent_collection": {
        "promotions": "none",
        "terms_of_service": "none",
        "payment_method_reuse_agreement": null
      },
      "client_reference_id": null,
      "currency_conversion": null,
      "payment_method_types": [
        "card",
        "link"
      ],
      "allow_promotion_codes": false,
      "collected_information": {
        "business_name": null,
        "individual_name": null,
        "shipping_details": null
      },
      "payment_method_options": {
        "card": {
          "request_three_d_secure": "automatic"
        }
      },
      "phone_number_collection": {
        "enabled": false
      },
      "payment_method_collection": "always",
      "billing_address_collection": "auto",
      "shipping_address_collection": null,
      "saved_payment_method_options": {
        "payment_method_save": null,
        "payment_method_remove": "disabled",
        "allow_redisplay_filters": [
          "always"
        ]
      },
      "payment_method_configuration_details": {
        "id": "pmc_1SVV3GBTq5zaRnxJTgSngcJV",
        "parent": null
      }
    }
  },
  "type": "checkout.session.completed",
  "object": "event",
  "created": 1768951926,
  "request": {
    "id": null,
    "idempotency_key": null
  },
  "livemode": true,
  "api_version": "2025-11-17.clover",
  "pending_webhooks": 1
}



##LOG WEBHOOK - customer.subscription.created
{
  "object": {
    "id": "sub_1SroP3BTq5zaRnxJTECn3nrC",
    "object": "subscription",
    "application": null,
    "application_fee_percent": null,
    "automatic_tax": {
      "disabled_reason": null,
      "enabled": true,
      "liability": {
        "type": "self"
      }
    },
    "billing_cycle_anchor": 1768951923,
    "billing_cycle_anchor_config": null,
    "billing_mode": {
      "flexible": {
        "proration_discounts": "included"
      },
      "type": "flexible"
    },
    "billing_thresholds": null,
    "cancel_at": null,
    "cancel_at_period_end": false,
    "canceled_at": null,
    "cancellation_details": {
      "comment": null,
      "feedback": null,
      "reason": null
    },
    "collection_method": "charge_automatically",
    "created": 1768951923,
    "currency": "usd",
    "customer": "cus_TpTL6kxVjlhFht",
    "customer_account": null,
    "days_until_due": null,
    "default_payment_method": "pm_1SroOzBTq5zaRnxJZGX9t03r",
    "default_source": null,
    "default_tax_rates": [],
    "description": null,
    "discounts": [],
    "ended_at": null,
    "invoice_settings": {
      "account_tax_ids": null,
      "issuer": {
        "type": "self"
      }
    },
    "items": {
      "object": "list",
      "data": [
        {
          "id": "si_TpTLuxYduI8VVh",
          "object": "subscription_item",
          "billing_thresholds": null,
          "created": 1768951923,
          "current_period_end": 1771630323,
          "current_period_start": 1768951923,
          "discounts": [],
          "metadata": {},
          "plan": {
            "id": "price_1SWioIBTq5zaRnxJQxacBnch",
            "object": "plan",
            "active": true,
            "amount": 900,
            "amount_decimal": "900",
            "billing_scheme": "per_unit",
            "created": 1763925538,
            "currency": "usd",
            "interval": "month",
            "interval_count": 1,
            "livemode": true,
            "metadata": {},
            "meter": null,
            "nickname": null,
            "product": "prod_TTfl4ccopmSAnb",
            "tiers_mode": null,
            "transform_usage": null,
            "trial_period_days": null,
            "usage_type": "licensed"
          },
          "price": {
            "id": "price_1SWioIBTq5zaRnxJQxacBnch",
            "object": "price",
            "active": true,
            "billing_scheme": "per_unit",
            "created": 1763925538,
            "currency": "usd",
            "custom_unit_amount": null,
            "livemode": true,
            "lookup_key": null,
            "metadata": {},
            "nickname": null,
            "product": "prod_TTfl4ccopmSAnb",
            "recurring": {
              "interval": "month",
              "interval_count": 1,
              "meter": null,
              "trial_period_days": null,
              "usage_type": "licensed"
            },
            "tax_behavior": "unspecified",
            "tiers_mode": null,
            "transform_quantity": null,
            "type": "recurring",
            "unit_amount": 900,
            "unit_amount_decimal": "900"
          },
          "quantity": 1,
          "subscription": "sub_1SroP3BTq5zaRnxJTECn3nrC",
          "tax_rates": []
        },
        {
          "id": "si_TpTLg42y38u7N3",
          "object": "subscription_item",
          "billing_thresholds": null,
          "created": 1768951923,
          "current_period_end": 1771630323,
          "current_period_start": 1768951923,
          "discounts": [],
          "metadata": {},
          "plan": {
            "id": "price_1SmCQYBTq5zaRnxJIGALK6Ml",
            "object": "plan",
            "active": true,
            "amount": 499,
            "amount_decimal": "499",
            "billing_scheme": "per_unit",
            "created": 1767614306,
            "currency": "usd",
            "interval": "month",
            "interval_count": 1,
            "livemode": true,
            "metadata": {},
            "meter": null,
            "nickname": "21 dias",
            "product": "prod_TTfxYqIhvEeiKa",
            "tiers_mode": null,
            "transform_usage": null,
            "trial_period_days": null,
            "usage_type": "licensed"
          },
          "price": {
            "id": "price_1SmCQYBTq5zaRnxJIGALK6Ml",
            "object": "price",
            "active": true,
            "billing_scheme": "per_unit",
            "created": 1767614306,
            "currency": "usd",
            "custom_unit_amount": null,
            "livemode": true,
            "lookup_key": "low_ticket_21days",
            "metadata": {},
            "nickname": "21 dias",
            "product": "prod_TTfxYqIhvEeiKa",
            "recurring": {
              "interval": "month",
              "interval_count": 1,
              "meter": null,
              "trial_period_days": null,
              "usage_type": "licensed"
            },
            "tax_behavior": "exclusive",
            "tiers_mode": null,
            "transform_quantity": null,
            "type": "recurring",
            "unit_amount": 499,
            "unit_amount_decimal": "499"
          },
          "quantity": 1,
          "subscription": "sub_1SroP3BTq5zaRnxJTECn3nrC",
          "tax_rates": []
        },
        {
          "id": "si_TpTLbfz24xzmPp",
          "object": "subscription_item",
          "billing_thresholds": null,
          "created": 1768951923,
          "current_period_end": 1771630323,
          "current_period_start": 1768951923,
          "discounts": [],
          "metadata": {},
          "plan": {
            "id": "price_1SmHE1BTq5zaRnxJSuFqA8fl",
            "object": "plan",
            "active": true,
            "amount": 789,
            "amount_decimal": "789",
            "billing_scheme": "per_unit",
            "created": 1767632749,
            "currency": "usd",
            "interval": "month",
            "interval_count": 1,
            "livemode": true,
            "metadata": {},
            "meter": null,
            "nickname": null,
            "product": "prod_TTgOHAIhXSbdjI",
            "tiers_mode": null,
            "transform_usage": null,
            "trial_period_days": null,
            "usage_type": "licensed"
          },
          "price": {
            "id": "price_1SmHE1BTq5zaRnxJSuFqA8fl",
            "object": "price",
            "active": true,
            "billing_scheme": "per_unit",
            "created": 1767632749,
            "currency": "usd",
            "custom_unit_amount": null,
            "livemode": true,
            "lookup_key": null,
            "metadata": {},
            "nickname": null,
            "product": "prod_TTgOHAIhXSbdjI",
            "recurring": {
              "interval": "month",
              "interval_count": 1,
              "meter": null,
              "trial_period_days": null,
              "usage_type": "licensed"
            },
            "tax_behavior": "exclusive",
            "tiers_mode": null,
            "transform_quantity": null,
            "type": "recurring",
            "unit_amount": 789,
            "unit_amount_decimal": "789"
          },
          "quantity": 1,
          "subscription": "sub_1SroP3BTq5zaRnxJTECn3nrC",
          "tax_rates": []
        }
      ],
      "has_more": false,
      "total_count": 3,
      "url": "/v1/subscription_items?subscription=sub_1SroP3BTq5zaRnxJTECn3nrC"
    },
    "latest_invoice": "in_1SroP1BTq5zaRnxJZDraduS0",
    "livemode": true,
    "metadata": {},
    "next_pending_invoice_item_invoice": null,
    "on_behalf_of": null,
    "pause_collection": null,
    "payment_settings": {
      "payment_method_options": {
        "acss_debit": null,
        "bancontact": null,
        "card": {
          "network": null,
          "request_three_d_secure": "automatic"
        },
        "customer_balance": null,
        "konbini": null,
        "payto": null,
        "sepa_debit": null,
        "us_bank_account": null
      },
      "payment_method_types": null,
      "save_default_payment_method": "off"
    },
    "pending_invoice_item_interval": null,
    "pending_setup_intent": null,
    "pending_update": null,
    "plan": null,
    "quantity": null,
    "schedule": null,
    "start_date": 1768951923,
    "status": "active",
    "test_clock": null,
    "transfer_data": null,
    "trial_end": null,
    "trial_settings": {
      "end_behavior": {
        "missing_payment_method": "create_invoice"
      }
    },
    "trial_start": null
  },
  "previous_attributes": null
}

##LOG WEBOOK - checkout.session.completed

{
  "object": {
    "id": "cs_live_a1zOHSfHWaxP8K3p1LVmXWlTBzALqIyGctkiGsKsa7SW7oYZy0AApRiGhY",
    "object": "checkout.session",
    "adaptive_pricing": {
      "enabled": true
    },
    "after_expiration": null,
    "allow_promotion_codes": false,
    "amount_subtotal": 2188,
    "amount_total": 2188,
    "automatic_tax": {
      "enabled": true,
      "liability": {
        "type": "self"
      },
      "provider": "stripe",
      "status": "complete"
    },
    "billing_address_collection": "auto",
    "cancel_url": "https://stripe.com",
    "client_reference_id": null,
    "client_secret": null,
    "collected_information": {
      "business_name": null,
      "individual_name": null,
      "shipping_details": null
    },
    "consent": null,
    "consent_collection": {
      "payment_method_reuse_agreement": null,
      "promotions": "none",
      "terms_of_service": "none"
    },
    "created": 1768951763,
    "currency": "usd",
    "currency_conversion": null,
    "custom_fields": [],
    "custom_text": {
      "after_submit": null,
      "shipping_address": null,
      "submit": null,
      "terms_of_service_acceptance": null
    },
    "customer": "cus_TpTL6kxVjlhFht",
    "customer_account": null,
    "customer_creation": "if_required",
    "customer_details": {
      "address": {
        "city": null,
        "country": "MX",
        "line1": null,
        "line2": null,
        "postal_code": null,
        "state": null
      },
      "business_name": null,
      "email": "adalet2023@gmail.com",
      "individual_name": null,
      "name": "diridiana cancino",
      "phone": null,
      "tax_exempt": "none",
      "tax_ids": []
    },
    "customer_email": null,
    "discounts": [],
    "expires_at": 1769038163,
    "invoice": "in_1SroP1BTq5zaRnxJZDraduS0",
    "invoice_creation": null,
    "livemode": true,
    "locale": "auto",
    "metadata": {},
    "mode": "subscription",
    "origin_context": null,
    "payment_intent": null,
    "payment_link": "plink_1SWjCYBTq5zaRnxJrLFRWd23",
    "payment_method_collection": "always",
    "payment_method_configuration_details": {
      "id": "pmc_1SVV3GBTq5zaRnxJTgSngcJV",
      "parent": null
    },
    "payment_method_options": {
      "card": {
        "request_three_d_secure": "automatic"
      }
    },
    "payment_method_types": [
      "card",
      "link"
    ],
    "payment_status": "paid",
    "permissions": null,
    "phone_number_collection": {
      "enabled": false
    },
    "recovered_from": null,
    "saved_payment_method_options": {
      "allow_redisplay_filters": [
        "always"
      ],
      "payment_method_remove": "disabled",
      "payment_method_save": null
    },
    "setup_intent": null,
    "shipping_address_collection": null,
    "shipping_cost": null,
    "shipping_options": [],
    "status": "complete",
    "submit_type": "donate",
    "subscription": "sub_1SroP3BTq5zaRnxJTECn3nrC",
    "success_url": "https://stripe.com",
    "total_details": {
      "amount_discount": 0,
      "amount_shipping": 0,
      "amount_tax": 0
    },
    "ui_mode": "hosted",
    "url": null,
    "wallet_options": null
  },
  "previous_attributes": null
}