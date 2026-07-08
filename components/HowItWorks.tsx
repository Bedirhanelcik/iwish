import Image from "next/image";

export default function HowItWorks() {
  return (
    <section className="w-full pt-0 pb-20">
      <div className="mx-auto max-w-[1600px] px-[72px]">

        {/* Heading */}
        <div className="text-center mb-16 mt-22">
          <h2 className="text-[52px] font-bold tracking-tight text-[#111111]">
            How It Works
          </h2>

          <p className="mt-4 text-[20px] text-[#8a8a8a]">
            Create, share, and manage your wishlists for any occasion.
          </p>
        </div>

        {/* STEP 1 */}
        <div className="flex items-center justify-center gap-20">
          {/* Left */}
          <div className="w-[40%] max-w-[520px]">
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm border border-gray-100">
              <span className="text-sm font-semibold text-gray-700">1</span>
            </div>

            <h3 className="text-[48px] font-bold leading-tight text-[#111111]">
              Create Your Wishlist
            </h3>

            <p className="mt-6 text-[22px] leading-[1.8] text-[#8b8b8b]">
              Create beautiful wishlists for birthdays, holidays, gaming,
              fashion, technology and more. Save products from any online
              store and organize everything in one place.
            </p>
          </div>

          {/* Right */}
         <div className="w-[52%] flex justify-center">
  <Image
    src="/howitworks/hw1.png"
    alt="Create Wishlist"
    width={900}
    height={700}
    priority
    className="w-[92%] max-w-[620px] h-auto object-contain"
  />
</div>
        </div>

        {/* STEP 2 */}
        <div className="flex items-center justify-center gap-20 mt-46">
          {/* Left Image */}
          <div className="w-[52%] flex justify-center">
            <Image
              src="/howitworks/hw2.png"
              alt="Add Wishes"
              width={950}
              height={750}
              className="w-full max-w-[650px] h-auto object-contain"
            />
          </div>

          {/* Right Text */}
          <div className="w-[40%] max-w-[520px]">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-white border border-gray-200 shadow-sm">
              <span className="text-sm font-semibold text-gray-700">2</span>
            </div>

            <h3 className="text-[38px] font-bold leading-tight text-[#111111]">
              Add Wishes Your Way
            </h3>

            <p className="mt-6 text-[19px] leading-[1.9] text-[#8b8b8b]">
              Add products instantly using a product URL from any store, or
              create wishes manually with your own image, title and
              description. Everything stays organized in one place and is
              accessible anytime through your browser.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}