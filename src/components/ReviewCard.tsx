/* eslint-disable @typescript-eslint/no-unsafe-assignment */

export default function ReviewCard({ review }: { review: any }) {
  const { name, review: reviewText } = review || {};
  return (
    <div>
      <p className="border border-gray-100 my-3"></p>
      <div className="flex items-center gap-5">
        <div>
          <div className="avatar">
            <div className="w-16 rounded-full shadow-lg shadow-gray-400 ring-offset-2">
              <img src="https://cdn-icons-png.flaticon.com/512/666/666201.png" />
            </div>
          </div>
        </div>
        <div>
          <h2 className="font-medium mb-1.5">{name}</h2>
          <p>{reviewText}</p>
        </div>
      </div>
    </div>
  );
}
