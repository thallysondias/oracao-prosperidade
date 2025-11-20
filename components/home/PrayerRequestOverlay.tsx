"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Package, CheckCircle, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";

interface PrayerRequestStatus {
  id: string;
  status: string;
  goal: string;
  prayer_text: string;
  payment_link: string;
  created_at: string;
}

export default function PrayerRequestOverlay() {
  const t = useTranslations?.("PrayerRequest") || ((k: string) => k);
  const user = useAuthStore((s) => s.user);
  const [existingRequest, setExistingRequest] = useState<PrayerRequestStatus | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    const check = async () => {
      if (!user?.email) {
        console.log("PrayerRequestOverlay: No user email");
        setLoading(false);
        return;
      }

      console.log("PrayerRequestOverlay: Checking status for email:", user.email);

      try {
        const res = await fetch(`/api/prayer-request?email=${encodeURIComponent(user.email)}`);
        const data = await res.json();
        
        console.log("PrayerRequestOverlay: API response:", { status: res.status, data });
        
        if (!mounted) return;
        if (res.ok && data.request) {
          console.log("PrayerRequestOverlay: Setting existing request:", data.request);
          setExistingRequest(data.request);
        } else {
          console.log("PrayerRequestOverlay: No request found");
        }
      } catch (err) {
        console.error("PrayerRequestOverlay error:", err);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    check();
    return () => {
      mounted = false;
    };
  }, [user?.email]);

  if (loading || !existingRequest) return null;

  const status = existingRequest.status;

  const getIcon = () => {
    if (status === "pending") return <Clock className="w-6 h-6 text-yellow-500" />;
    if (status === "approved") return <Package className="w-6 h-6 text-blue-500" />;
    return <CheckCircle className="w-6 h-6 text-green-500" />;
  };

  return (
    <div className="mb-6">
      <Card className="p-4 shadow-xl bg-black border-none">
        <div className="flex items-center gap-3">
          {getIcon()}
          <div className="flex-1">
            <p className="text-sm font-semibold text-white">{t(`status${status.charAt(0).toUpperCase() + status.slice(1)}Title`)}</p>
            <p className="text-xs text-gray-300">{t(`status${status.charAt(0).toUpperCase() + status.slice(1)}Message`)}</p>
          </div>
        </div>

        {status === "pending" && existingRequest.payment_link && (
          <div className="mt-3">
            <Button asChild className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold">
              <a href={existingRequest.payment_link} target="_blank" rel="noreferrer noopener">
                <Sparkles className="w-4 h-4 mr-2" /> {t("completePayment")}
              </a>
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
}
