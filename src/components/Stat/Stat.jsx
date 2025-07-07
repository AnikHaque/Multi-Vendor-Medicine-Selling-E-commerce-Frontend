const Stat = () => {
  return (
    <div>
      <section class="py-10 bg-gray-50 sm:py-16 lg:py-24">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="grid items-center md:grid-cols-2 md:gap-x-20 gap-y-10">
            <div class="relative pl-16 pr-10 sm:pl-6 md:pl-0 xl:pr-0 md:order-2">
              <img
                class="absolute top-6 -right-4 xl:-right-12"
                src="https://cdn.rareblocks.xyz/collection/celebration/images/features/3/dots-pattern.svg"
                alt=""
              />

              <div class="relative max-w-xs ml-auto">
                <div class="overflow-hidden aspect-w-3 aspect-h-4">
                  <img
                    class="object-cover w-full h-full scale-150"
                    src="https://cdn.rareblocks.xyz/collection/celebration/images/features/3/man-woman-discussing.jpg"
                    alt=""
                  />
                </div>

                <div class="absolute bottom-0 -left-16">
                  <div class="bg-blue-500">
                    <div class="py-4 pl-4 pr-10 sm:py-6 sm:pl-8 sm:pr-16">
                      <svg
                        class="w-9 sm:w-14 h-9 sm:h-14"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="#FFF"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="1"
                          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                        />
                      </svg>
                      <span class="block mt-3 text-xl font-bold text-white sm:mt-6 sm:text-4xl lg:text-5xl">
                        {" "}
                        2,984{" "}
                      </span>
                      <span class="block mt-2 text-sm font-medium leading-snug text-white sm:text-base">
                        {" "}
                        Client's chat
                        <br />
                        served on this month{" "}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="md:order-1">
              <h2 class="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">
                Start a Conversation, Build a Connection
              </h2>
              <p class="mt-4 text-base leading-relaxed text-gray-600">
                Finding the right freelancer is more than just reviewing
                portfolios — it starts with a real conversation. Our platform
                makes it easy to connect directly with talented professionals
                from around the world. Whether you have questions about a
                freelancer’s experience, want to discuss project scope, or need
                a quick estimate, our secure chat system helps you communicate
                clearly and confidently.
              </p>
              <p class="mt-4 text-base leading-relaxed text-gray-600">
                Share files, negotiate terms, and get to know your freelancer —
                all in one place, before making a hiring decision. Because
                strong communication leads to stronger results.
              </p>

              <a
                href="#"
                title=""
                class="inline-flex items-center justify-center px-8 py-3 mt-8 text-base font-semibold text-white transition-all duration-200 bg-blue-600 rounded-md hover:bg-blue-700 focus:bg-blue-700"
                role="button"
              >
                {" "}
                Start exploring{" "}
              </a>
            </div>
          </div>
        </div>
      </section>
      ;
    </div>
  );
};

export default Stat;
