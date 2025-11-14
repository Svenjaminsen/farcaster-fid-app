"use client";

import { useMiniApp } from "@neynar/react";
import { useNeynarUser } from "~/hooks/useNeynarUser";

/**
 * UserInfoTab component displays the user's FID and account creation date.
 * 
 * This component shows:
 * - User's Farcaster ID (FID)
 * - Account creation date and time
 * - Username
 * - Profile picture
 * 
 * @example
 * ```tsx
 * <UserInfoTab />
 * ```
 */
export function UserInfoTab() {
  const { context } = useMiniApp();
  const { user: neynarUser, loading, error } = useNeynarUser(context || undefined);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-200px)]">
        <div className="text-center">
          <div className="spinner h-8 w-8 mx-auto mb-4"></div>
          <p>Loading user information...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-200px)] px-6">
        <div className="text-center w-full max-w-md mx-auto">
          <p className="text-red-500 mb-2">Error loading user information</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">{error}</p>
        </div>
      </div>
    );
  }

  if (!neynarUser) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-200px)] px-6">
        <div className="text-center w-full max-w-md mx-auto">
          <p className="text-lg mb-2">No user information available</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">Please make sure you're logged in</p>
        </div>
      </div>
    );
  }

  // Format the creation date
  const createdAtDate = neynarUser.created_at 
    ? new Date(neynarUser.created_at * 1000)
    : null;

  const formattedDate = createdAtDate 
    ? createdAtDate.toLocaleDateString('de-DE', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZone: 'UTC'
      })
    : 'Unknown';

  return (
    <div className="flex items-center justify-center h-[calc(100vh-200px)] px-6">
      <div className="w-full max-w-md mx-auto">
        {/* Profile Picture */}
        {neynarUser.pfp_url && (
          <div className="flex justify-center mb-6">
            <img 
              src={neynarUser.pfp_url} 
              alt={neynarUser.username || 'User'}
              className="w-24 h-24 rounded-full border-2 border-gray-300 dark:border-gray-700"
            />
          </div>
        )}

        {/* User Information Card */}
        <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 space-y-4">
          {/* Username */}
          {neynarUser.username && (
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Username</p>
              <p className="text-lg font-semibold">@{neynarUser.username}</p>
            </div>
          )}

          {/* FID */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Farcaster ID (FID)</p>
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{neynarUser.fid}</p>
          </div>

          {/* Account Creation Date */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Account Created</p>
            <p className="text-lg font-semibold">{formattedDate}</p>
          </div>

          {/* Bio */}
          {neynarUser.profile?.bio?.text && (
            <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Bio</p>
              <p className="text-sm">{neynarUser.profile.bio.text}</p>
            </div>
          )}

          {/* Follower/Following Stats */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-4 grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Followers</p>
              <p className="text-lg font-semibold">{neynarUser.follower_count || 0}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Following</p>
              <p className="text-lg font-semibold">{neynarUser.following_count || 0}</p>
            </div>
          </div>

          {/* Power Badge */}
          {neynarUser.power_badge && (
            <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
              <div className="inline-block bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 px-3 py-1 rounded-full text-sm font-semibold">
                ⭐ Power Badge
              </div>
            </div>
          )}
        </div>

        {/* Footer Info */}
        <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-6">
          Powered by Neynar 🪐
        </p>
      </div>
    </div>
  );
}
