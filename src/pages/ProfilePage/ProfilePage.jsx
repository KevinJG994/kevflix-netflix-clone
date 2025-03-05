import "./ProfilePage.css";

function ProfilePage() {
  return (
    <div className="hero bg-base-100 min-h-screen flex flex-col items-center">
      <div className="hero-content flex flex-col items-center text-center lg:text-left lg:flex-row lg:m-auto sm:mt-20">
        <div className="flex flex-col items-center lg:items-start">
          <img
            src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
            className="max-w-sm rounded-lg shadow-2xl"
          />
          <div className="flex justify-center lg:justify-start mt-4">
            <button
              className="btn btn-primary mr-4"
              title="Edit info"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
              </svg>
            </button>

            <button className="btn btn-outline btn-primary" title="Favourite">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
              </svg>
            </button>

          </div>
        </div>

        <div className="lg:ml-10 mt-6 lg:mt-0 flex flex-col items-center lg:items-start">
          <h1 className="text-4xl font-bold text-primary-color">User Name</h1>
          <p className="text-lg mt-2">Email: Jon Watts</p>
          <div className="flex flex-col items-center lg:flex-row lg:justify-around my-6 w-full space-y-2 lg:space-y-0">
            <p className="text-lg">Favorite contect: 7.4</p>
            <div className="hidden lg:block border-l-2 border-primary-color h-6"></div>
            <p className="text-lg">Favourite Genders: 2h 13m</p>
            <div className="hidden lg:block border-l-2 border-primary-color h-6"></div>
            <p className="text-lg">Te uniste en: 2017</p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default ProfilePage;
