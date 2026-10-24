"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  User,
  MapPin,
  Phone,
  Mail,
  Plus,
  Trash2,
  Package,
  Heart,
  Save,
  CheckCircle,
} from "lucide-react";
import { toast } from "react-toastify";
import Link from "next/link";
import { useParams } from "next/navigation";

export type SavedAddress = {
  id: string;
  label: string;
  street: string;
  city: string;
  postalCode: string;
  country: string;
  isDefault?: boolean;
};

export default function ProfileClient() {
  const params = useParams();
  const locale = (params?.locale as string) || "en";

  const [profile, setProfile] = useState({
    name: "Foodie Guest",
    email: "customer@example.com",
    phone: "+1 (555) 012-3456",
  });

  const [addresses, setAddresses] = useState<SavedAddress[]>([
    {
      id: "addr-1",
      label: "Home",
      street: "123 Main Street, Apt 4B",
      city: "New York",
      postalCode: "10001",
      country: "USA",
      isDefault: true,
    },
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newAddress, setNewAddress] = useState({
    label: "Work",
    street: "",
    city: "",
    postalCode: "",
    country: "USA",
  });

  useEffect(() => {
    try {
      const storedProfile = localStorage.getItem("fasty_user_profile");
      if (storedProfile) {
        setProfile(JSON.parse(storedProfile));
      }
      const storedAddresses = localStorage.getItem("fasty_user_addresses");
      if (storedAddresses) {
        setAddresses(JSON.parse(storedAddresses));
      }
    } catch {
      // ignore
    }
  }, []);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      localStorage.setItem("fasty_user_profile", JSON.stringify(profile));
      toast.success("Profile details updated successfully!", {
        position: "bottom-left",
      });
    } catch {
      toast.error("Failed to save profile", { position: "bottom-left" });
    }
  };

  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAddress.street.trim() || !newAddress.city.trim()) {
      toast.error("Please fill in the required address fields.");
      return;
    }

    const created: SavedAddress = {
      id: `addr-${Date.now()}`,
      label: newAddress.label || "Other",
      street: newAddress.street,
      city: newAddress.city,
      postalCode: newAddress.postalCode,
      country: newAddress.country,
      isDefault: addresses.length === 0,
    };

    const updated = [...addresses, created];
    setAddresses(updated);
    localStorage.setItem("fasty_user_addresses", JSON.stringify(updated));
    setShowAddForm(false);
    setNewAddress({
      label: "Work",
      street: "",
      city: "",
      postalCode: "",
      country: "USA",
    });
    toast.success("New delivery address added!", { position: "bottom-left" });
  };

  const handleDeleteAddress = (id: string) => {
    const updated = addresses.filter((a) => a.id !== id);
    setAddresses(updated);
    localStorage.setItem("fasty_user_addresses", JSON.stringify(updated));
    toast.info("Address deleted", { position: "bottom-left" });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Left Sidebar: Quick Nav */}
      <div className="space-y-4">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 text-center">
          <div className="w-20 h-20 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
            {profile.name.charAt(0).toUpperCase()}
          </div>
          <h2 className="text-xl font-bold text-gray-900">{profile.name}</h2>
          <p className="text-sm text-gray-500">{profile.email}</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden divide-y divide-gray-100">
          <Link
            href={`/${locale}/orders`}
            className="flex items-center gap-3 p-4 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <Package className="h-4 w-4 text-primary" />
            <span>My Orders & History</span>
          </Link>
          <Link
            href={`/${locale}/favorites`}
            className="flex items-center gap-3 p-4 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <Heart className="h-4 w-4 text-red-500" />
            <span>Saved Favorites</span>
          </Link>
          <Link
            href={`/${locale}/offers`}
            className="flex items-center gap-3 p-4 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <CheckCircle className="h-4 w-4 text-green-600" />
            <span>Active Offers & Coupons</span>
          </Link>
        </div>
      </div>

      {/* Main Content: Profile & Saved Addresses */}
      <div className="lg:col-span-2 space-y-8">
        {/* Personal Details */}
        <div className="bg-white rounded-xl shadow-sm p-6 sm:p-8 border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <User className="h-5 w-5 text-primary" />
            Customer Information
          </h3>

          <form onSubmit={handleSaveProfile} className="space-y-4">
            <div>
              <Label htmlFor="name" className="text-sm text-gray-700">
                Full Name
              </Label>
              <Input
                id="name"
                value={profile.name}
                onChange={(e) =>
                  setProfile({ ...profile, name: e.target.value })
                }
                className="mt-1 h-10 text-sm"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label
                  htmlFor="email"
                  className="text-sm text-gray-700 flex items-center gap-1.5"
                >
                  <Mail className="h-3.5 w-3.5 text-gray-500" />
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={profile.email}
                  onChange={(e) =>
                    setProfile({ ...profile, email: e.target.value })
                  }
                  className="mt-1 h-10 text-sm"
                  required
                />
              </div>

              <div>
                <Label
                  htmlFor="phone"
                  className="text-sm text-gray-700 flex items-center gap-1.5"
                >
                  <Phone className="h-3.5 w-3.5 text-gray-500" />
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  value={profile.phone}
                  onChange={(e) =>
                    setProfile({ ...profile, phone: e.target.value })
                  }
                  className="mt-1 h-10 text-sm"
                  required
                />
              </div>
            </div>

            <div className="pt-2">
              <Button type="submit" size="sm" className="gap-2 font-semibold">
                <Save className="h-4 w-4" />
                Save Changes
              </Button>
            </div>
          </form>
        </div>

        {/* Saved Delivery Addresses */}
        <div className="bg-white rounded-xl shadow-sm p-6 sm:p-8 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              Saved Delivery Addresses
            </h3>
            {!showAddForm && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowAddForm(true)}
                className="gap-1.5 text-xs font-semibold"
              >
                <Plus className="h-3.5 w-3.5" />
                Add Address
              </Button>
            )}
          </div>

          {showAddForm && (
            <form
              onSubmit={handleAddAddress}
              className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200 space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold text-sm text-gray-800">
                  New Address Details
                </span>
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="text-xs text-gray-500 hover:text-gray-800"
                >
                  Cancel
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs text-gray-600">Label</Label>
                  <Input
                    placeholder="e.g. Home, Office"
                    value={newAddress.label}
                    onChange={(e) =>
                      setNewAddress({ ...newAddress, label: e.target.value })
                    }
                    className="h-8 text-xs mt-1"
                  />
                </div>
                <div>
                  <Label className="text-xs text-gray-600">City</Label>
                  <Input
                    placeholder="New York"
                    value={newAddress.city}
                    onChange={(e) =>
                      setNewAddress({ ...newAddress, city: e.target.value })
                    }
                    className="h-8 text-xs mt-1"
                    required
                  />
                </div>
              </div>

              <div>
                <Label className="text-xs text-gray-600">Street Address</Label>
                <Input
                  placeholder="Street and building number"
                  value={newAddress.street}
                  onChange={(e) =>
                    setNewAddress({ ...newAddress, street: e.target.value })
                  }
                  className="h-8 text-xs mt-1"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs text-gray-600">Postal Code</Label>
                  <Input
                    placeholder="10001"
                    value={newAddress.postalCode}
                    onChange={(e) =>
                      setNewAddress({
                        ...newAddress,
                        postalCode: e.target.value,
                      })
                    }
                    className="h-8 text-xs mt-1"
                  />
                </div>
                <div>
                  <Label className="text-xs text-gray-600">Country</Label>
                  <Input
                    placeholder="USA"
                    value={newAddress.country}
                    onChange={(e) =>
                      setNewAddress({ ...newAddress, country: e.target.value })
                    }
                    className="h-8 text-xs mt-1"
                  />
                </div>
              </div>

              <div className="pt-2">
                <Button type="submit" size="sm" className="h-8 text-xs">
                  Save Address
                </Button>
              </div>
            </form>
          )}

          <div className="space-y-3">
            {addresses.map((addr) => (
              <div
                key={addr.id}
                className="flex items-start justify-between p-4 rounded-lg border border-gray-100 hover:border-gray-200 transition-colors bg-white"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-sm text-gray-900">
                      {addr.label}
                    </span>
                    {addr.isDefault && (
                      <span className="text-[10px] font-semibold bg-gray-100 text-gray-700 px-2 py-0.5 rounded">
                        Default
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    {addr.street}, {addr.city} {addr.postalCode}, {addr.country}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => handleDeleteAddress(addr.id)}
                  className="text-gray-400 hover:text-red-500 p-1"
                  title="Delete address"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
