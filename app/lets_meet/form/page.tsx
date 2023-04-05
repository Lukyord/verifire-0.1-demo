"use client";

export default function page({
  searchParams,
}: {
  searchParams: { id: string; displayName: string };
}) {
  return (
    <div>
      <p>{searchParams.id}</p>
      <p>{searchParams.displayName}</p>
    </div>
  );
}
