"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams } from "next/navigation";
import {
  Calendar,
  Users,
  DollarSign,
  CheckCircle,
  XCircle,
  Clock,
  Trash2,
  Eye,
  Sun,
  Filter,
  RefreshCw,
} from "lucide-react";
import {
  getBookings,
  updateBookingStatus,
  deleteBooking,
  type Booking,
} from "@/lib/bookingStore";
import {
  ROOM_ORDER,
  defaultRoomSettings,
  getRoomSettings,
  saveRoomSettings,
  type RoomKey,
  type RoomSettingsMap,
} from "@/lib/roomSettings";
import { format } from "date-fns";

const roomNames: Record<string, string> = {
  oceanBreezeA: "Ocean Sea Breeze A",
  oceanBreezeB: "Ocean Sea Breeze B",
  oceanBreezeC: "Ocean Sea Breeze C",
  oceanBreezeD: "Ocean Sea Breeze D",
  surferRoomA: "Surfer Room A",
  surferRoomB: "Surfer Room B",
  surferRoomC: "Surfer Room C",
  family: "Family Room",
};

const ADMIN_PASSWORD = "sunshine";
const AUTH_KEY = "hello_sunshine_admin_authed";

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-700 border-yellow-200",
  confirmed: "bg-green-100 text-green-700 border-green-200",
  cancelled: "bg-red-100 text-red-700 border-red-200",
};

const statusIcons: Record<string, typeof Clock> = {
  pending: Clock,
  confirmed: CheckCircle,
  cancelled: XCircle,
};

export default function AdminPage() {
  const params = useParams<{ locale: string }>();
  const locale = params?.locale ?? "ko";
  const basePath = `/${locale}`;
  const [isMounted, setIsMounted] = useState(false);
  const [isAuthed, setIsAuthed] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [loginError, setLoginError] = useState("");
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filter, setFilter] = useState<"all" | "pending" | "confirmed" | "cancelled">("all");
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [roomSettings, setRoomSettings] = useState<RoomSettingsMap>(defaultRoomSettings);
  const [selectedRoomKey, setSelectedRoomKey] = useState<RoomKey>("oceanBreezeA");
  const [saveMessage, setSaveMessage] = useState("");

  useEffect(() => {
    setIsMounted(true);
    loadBookings();
    setRoomSettings(getRoomSettings());
    setIsAuthed(sessionStorage.getItem(AUTH_KEY) === "true");
  }, []);

  const loadBookings = () => {
    setIsLoading(true);
    const data = getBookings();
    setBookings(data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
    setIsLoading(false);
  };

  const handleStatusChange = (id: string, status: Booking["status"]) => {
    updateBookingStatus(id, status);
    loadBookings();
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this booking?")) {
      deleteBooking(id);
      loadBookings();
      setSelectedBooking(null);
    }
  };

  const filteredBookings = bookings.filter(
    (b) => filter === "all" || b.status === filter
  );

  const stats = {
    total: bookings.length,
    pending: bookings.filter((b) => b.status === "pending").length,
    confirmed: bookings.filter((b) => b.status === "confirmed").length,
    revenue: bookings
      .filter((b) => b.status === "confirmed")
      .reduce((sum, b) => sum + b.totalPrice, 0),
  };

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);

  const handleLogin = () => {
    if (passwordInput === ADMIN_PASSWORD) {
      setIsAuthed(true);
      sessionStorage.setItem(AUTH_KEY, "true");
      setLoginError("");
    } else {
      setLoginError("비밀번호가 올바르지 않습니다.");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem(AUTH_KEY);
    setIsAuthed(false);
    setPasswordInput("");
  };

  const updateSelectedRoom = (patch: Partial<RoomSettingsMap[RoomKey]>) => {
    setRoomSettings((prev) => ({
      ...prev,
      [selectedRoomKey]: {
        ...prev[selectedRoomKey],
        ...patch,
      },
    }));
  };

  const handleSaveRooms = () => {
    saveRoomSettings(roomSettings);
    setSaveMessage("저장되었습니다.");
    setTimeout(() => setSaveMessage(""), 2000);
  };

  const handleResetRooms = () => {
    setRoomSettings(defaultRoomSettings);
    saveRoomSettings(defaultRoomSettings);
    setSaveMessage("기본값으로 초기화했습니다.");
    setTimeout(() => setSaveMessage(""), 2000);
  };

  const handleFileAsDataUrl = (file: File, cb: (value: string) => void) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") cb(reader.result);
    };
    reader.readAsDataURL(file);
  };

  if (!isMounted) {
    return null;
  }

  if (!isAuthed) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 w-full max-w-md">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Admin Login</h1>
          <p className="text-gray-500 mb-6">비밀번호를 입력해 주세요.</p>
          <input
            type="password"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-ocean-500/30"
            placeholder="Password"
          />
          {loginError && <p className="text-sm text-red-600 mt-2">{loginError}</p>}
          <button
            onClick={handleLogin}
            className="w-full mt-4 py-3 bg-ocean-600 hover:bg-ocean-700 text-white font-semibold rounded-xl transition-colors"
          >
            로그인
          </button>
          <p className="text-xs text-gray-400 mt-4">
            기본 비밀번호는 설정되어 있습니다. 변경이 필요하면 알려주세요.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3">
              <Sun className="w-8 h-8 text-sunset-500" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  Hello Sunshine Admin
                </h1>
                <p className="text-sm text-gray-500">Booking Management</p>
              </div>
            </div>
            <nav className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
              <a className="hover:text-ocean-600" href={`${basePath}#home`}>Home</a>
              <a className="hover:text-ocean-600" href={`${basePath}#rooms`}>Rooms</a>
              <a className="hover:text-ocean-600" href={`${basePath}#story`}>Host story</a>
              <a className="hover:text-ocean-600" href={`${basePath}#booking`}>Booking</a>
              <a className="hover:text-ocean-600" href={`${basePath}#contact`}>Contact</a>
            </nav>
            <div className="flex items-center gap-2">
              <button
                onClick={loadBookings}
                className="flex items-center gap-2 px-4 py-2 bg-ocean-500 text-white rounded-lg hover:bg-ocean-600 transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                Refresh
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-ocean-100 flex items-center justify-center">
                <Calendar className="w-6 h-6 text-ocean-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {stats.total}
                </div>
                <div className="text-sm text-gray-500">Total Bookings</div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {stats.pending}
                </div>
                <div className="text-sm text-gray-500">Pending</div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {stats.confirmed}
                </div>
                <div className="text-sm text-gray-500">Confirmed</div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-sunset-100 flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-sunset-600" />
              </div>
              <div>
                <div className="text-lg font-bold text-gray-900">
                  {formatPrice(stats.revenue)}
                </div>
                <div className="text-sm text-gray-500">Total Revenue</div>
              </div>
            </div>
          </div>
        </div>

        {/* Filter */}
        <div className="flex items-center gap-4 mb-6">
          <Filter className="w-5 h-5 text-gray-400" />
          <div className="flex gap-2">
            {(["all", "pending", "confirmed", "cancelled"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filter === f
                    ? "bg-ocean-500 text-white"
                    : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Bookings List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          {isLoading ? (
            <div className="p-12 text-center text-gray-500">Loading...</div>
          ) : filteredBookings.length === 0 ? (
            <div className="p-12 text-center">
              <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No bookings found</p>
              <p className="text-sm text-gray-400 mt-1">
                Bookings will appear here when guests make reservations
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Booking ID
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Guest
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Room
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Dates
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Total
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredBookings.map((booking) => {
                    const StatusIcon = statusIcons[booking.status];
                    return (
                      <tr
                        key={booking.id}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <span className="font-mono text-sm text-ocean-600">
                            {booking.id}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="font-medium text-gray-900">
                            {booking.guestName}
                          </div>
                          <div className="text-sm text-gray-500">
                            {booking.email}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-gray-900">
                            {roomNames[booking.roomId] || booking.roomName}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm">
                            <div className="text-gray-900">
                              {format(new Date(booking.checkIn), "MMM dd")} -{" "}
                              {format(new Date(booking.checkOut), "MMM dd, yyyy")}
                            </div>
                            <div className="text-gray-500">
                              {booking.nights} nights
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="font-semibold text-gray-900">
                            {formatPrice(booking.totalPrice)}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${
                              statusColors[booking.status]
                            }`}
                          >
                            <StatusIcon className="w-3.5 h-3.5" />
                            {booking.status.charAt(0).toUpperCase() +
                              booking.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => setSelectedBooking(booking)}
                              className="p-2 text-gray-400 hover:text-ocean-600 hover:bg-ocean-50 rounded-lg transition-colors"
                              title="View Details"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            {booking.status === "pending" && (
                              <button
                                onClick={() =>
                                  handleStatusChange(booking.id, "confirmed")
                                }
                                className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                                title="Confirm"
                              >
                                <CheckCircle className="w-4 h-4" />
                              </button>
                            )}
                            {booking.status !== "cancelled" && (
                              <button
                                onClick={() =>
                                  handleStatusChange(booking.id, "cancelled")
                                }
                                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                title="Cancel"
                              >
                                <XCircle className="w-4 h-4" />
                              </button>
                            )}
                            <button
                              onClick={() => handleDelete(booking.id)}
                              className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Room Availability Summary */}
        <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Room Inventory (Total: 8 rooms)
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {ROOM_ORDER.map((key) => (
              <div
                key={key}
                className="p-4 bg-sand-50 rounded-xl border border-sand-200"
              >
                <div className="font-medium text-gray-900">
                  {roomNames[key] ?? key}
                </div>
                <div className="text-sm text-gray-500 mt-1">1 room</div>
                <div className="text-sm text-gray-500 mt-1">
                  {roomSettings[key].price}/night
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Room Editor */}
        <div className="mt-10 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Room Editor</h2>
              <p className="text-sm text-gray-500">
                객실 가격/정보/이미지를 편집합니다. 저장 시 즉시 반영됩니다.
              </p>
            </div>
            <div className="flex items-center gap-2">
              {saveMessage && <span className="text-sm text-green-600">{saveMessage}</span>}
              <button
                onClick={handleResetRooms}
                className="px-4 py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-100"
              >
                Reset
              </button>
              <button
                onClick={handleSaveRooms}
                className="px-4 py-2 rounded-lg bg-ocean-600 text-white hover:bg-ocean-700"
              >
                Save
              </button>
            </div>
          </div>

          <div className="grid lg:grid-cols-[220px,1fr] gap-6">
            <div className="space-y-2">
              {ROOM_ORDER.map((key) => (
                <button
                  key={key}
                  onClick={() => setSelectedRoomKey(key)}
                  className={`w-full text-left px-4 py-3 rounded-lg border transition-colors ${
                    selectedRoomKey === key
                      ? "border-ocean-500 bg-ocean-50"
                      : "border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  {roomNames[key] ?? key}
                </button>
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Price</label>
                  <input
                    value={roomSettings[selectedRoomKey].price}
                    onChange={(e) => updateSelectedRoom({ price: e.target.value })}
                    className="mt-1 w-full border border-gray-200 rounded-xl px-4 py-2"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Name (override)</label>
                  <input
                    value={roomSettings[selectedRoomKey].nameOverride ?? ""}
                    onChange={(e) =>
                      updateSelectedRoom({ nameOverride: e.target.value || undefined })
                    }
                    className="mt-1 w-full border border-gray-200 rounded-xl px-4 py-2"
                    placeholder="비워두면 기본 번역 사용"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Description (override)</label>
                  <textarea
                    value={roomSettings[selectedRoomKey].descriptionOverride ?? ""}
                    onChange={(e) =>
                      updateSelectedRoom({ descriptionOverride: e.target.value || undefined })
                    }
                    className="mt-1 w-full border border-gray-200 rounded-xl px-4 py-2 min-h-[90px]"
                    placeholder="비워두면 기본 번역 사용"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Features (override)</label>
                  <textarea
                    value={(roomSettings[selectedRoomKey].featuresOverride ?? []).join("\n")}
                    onChange={(e) =>
                      updateSelectedRoom({
                        featuresOverride: e.target.value
                          ? e.target.value.split("\n").map((v) => v.trim()).filter(Boolean)
                          : undefined,
                      })
                    }
                    className="mt-1 w-full border border-gray-200 rounded-xl px-4 py-2 min-h-[120px]"
                    placeholder="한 줄에 하나씩 입력"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Main Image URL</label>
                  <input
                    value={roomSettings[selectedRoomKey].image}
                    onChange={(e) => updateSelectedRoom({ image: e.target.value })}
                    className="mt-1 w-full border border-gray-200 rounded-xl px-4 py-2"
                  />
                  <input
                    type="file"
                    accept="image/*"
                    className="mt-2 w-full text-sm text-gray-500"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        handleFileAsDataUrl(file, (dataUrl) =>
                          updateSelectedRoom({ image: dataUrl })
                        );
                      }
                    }}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Gallery URLs</label>
                  <textarea
                    value={roomSettings[selectedRoomKey].gallery.join("\n")}
                    onChange={(e) =>
                      updateSelectedRoom({
                        gallery: e.target.value
                          .split("\n")
                          .map((v) => v.trim())
                          .filter(Boolean),
                      })
                    }
                    className="mt-1 w-full border border-gray-200 rounded-xl px-4 py-2 min-h-[160px]"
                  />
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    className="mt-2 w-full text-sm text-gray-500"
                    onChange={(e) => {
                      const files = e.target.files ? Array.from(e.target.files) : [];
                      if (files.length === 0) return;
                      const existing = roomSettings[selectedRoomKey].gallery;
                      const readers = files.map(
                        (file) =>
                          new Promise<string>((resolve) => {
                            handleFileAsDataUrl(file, resolve);
                          })
                      );
                      Promise.all(readers).then((urls) => {
                        updateSelectedRoom({ gallery: [...urls, ...existing] });
                      });
                    }}
                  />
                  <p className="text-xs text-gray-400 mt-2">
                    이미지 업로드는 브라우저 저장소에 저장됩니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Live Preview */}
        <div className="mt-10 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Live Preview</h2>
              <p className="text-sm text-gray-500">
                실제 페이지를 보면서 텍스트/이미지 변경 결과를 확인하세요.
              </p>
            </div>
            <a
              href={`${basePath}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-100"
            >
              새 탭으로 열기
            </a>
          </div>
          <div className="rounded-2xl overflow-hidden border border-gray-200">
            <iframe
              title="Live preview"
              src={basePath}
              className="w-full h-[80vh] bg-white"
            />
          </div>
        </div>
      </main>

      {/* Booking Detail Modal */}
      <AnimatePresence>
        {selectedBooking && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedBooking(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Booking Details
                  </h3>
                  <button
                    onClick={() => setSelectedBooking(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <XCircle className="w-6 h-6" />
                  </button>
                </div>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-mono text-ocean-600">
                    {selectedBooking.id}
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium border ${
                      statusColors[selectedBooking.status]
                    }`}
                  >
                    {selectedBooking.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                  <div>
                    <div className="text-sm text-gray-500">Guest Name</div>
                    <div className="font-medium">{selectedBooking.guestName}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Phone</div>
                    <div className="font-medium">{selectedBooking.phone}</div>
                  </div>
                  <div className="col-span-2">
                    <div className="text-sm text-gray-500">Email</div>
                    <div className="font-medium">{selectedBooking.email}</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                  <div>
                    <div className="text-sm text-gray-500">Room</div>
                    <div className="font-medium">
                      {roomNames[selectedBooking.roomId]}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Duration</div>
                    <div className="font-medium">
                      {selectedBooking.nights} nights
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Check In</div>
                    <div className="font-medium">
                      {format(new Date(selectedBooking.checkIn), "MMM dd, yyyy")}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Check Out</div>
                    <div className="font-medium">
                      {format(new Date(selectedBooking.checkOut), "MMM dd, yyyy")}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-500">Total Price</span>
                    <span className="font-semibold">
                      {formatPrice(selectedBooking.totalPrice)}
                    </span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-500">Deposit</span>
                    <span className="font-medium text-sunset-600">
                      {formatPrice(selectedBooking.deposit)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Remaining</span>
                    <span className="font-medium">
                      {formatPrice(selectedBooking.totalPrice - selectedBooking.deposit)}
                    </span>
                  </div>
                </div>

                {selectedBooking.specialRequests && (
                  <div className="pt-4 border-t">
                    <div className="text-sm text-gray-500 mb-1">
                      Special Requests
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg text-sm">
                      {selectedBooking.specialRequests}
                    </div>
                  </div>
                )}

                <div className="pt-4 border-t text-sm text-gray-500">
                  Booked on{" "}
                  {format(
                    new Date(selectedBooking.createdAt),
                    "MMM dd, yyyy 'at' HH:mm"
                  )}
                </div>
              </div>

              <div className="p-6 border-t border-gray-100 flex gap-3">
                {selectedBooking.status === "pending" && (
                  <button
                    onClick={() => {
                      handleStatusChange(selectedBooking.id, "confirmed");
                      setSelectedBooking(null);
                    }}
                    className="flex-1 py-3 bg-green-500 hover:bg-green-600 text-white font-medium rounded-xl transition-colors"
                  >
                    Confirm Booking
                  </button>
                )}
                {selectedBooking.status !== "cancelled" && (
                  <button
                    onClick={() => {
                      handleStatusChange(selectedBooking.id, "cancelled");
                      setSelectedBooking(null);
                    }}
                    className="flex-1 py-3 bg-red-500 hover:bg-red-600 text-white font-medium rounded-xl transition-colors"
                  >
                    Cancel Booking
                  </button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
