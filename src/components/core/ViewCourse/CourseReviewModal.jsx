import { useEffect , useState } from "react"
import { useForm } from "react-hook-form"
import { RxCross2 } from "react-icons/rx"
import ReactStars from "react-rating-stars-component";
import { useSelector } from "react-redux"
import { FaStar } from "react-icons/fa"

import { createRating } from "../../../services/operations/courseDetailsAPI"
import IconBtn from "../../common/IconBtn"

export default function CourseReviewModal({ setReviewModal }) {
  const { user } = useSelector((state) => state.profile)
  const { token } = useSelector((state) => state.auth)
  const { courseEntireData } = useSelector((state) => state.viewCourse)
  const StarRating = ({ value = 0, onChange, max = 5 }) => {
  const [hover, setHover] = useState(null)

  return (
    <div className="flex gap-1">
      {Array.from({ length: max }).map((_, index) => {
        const ratingValue = index + 1
        const filled =
          hover !== null ? ratingValue <= hover : ratingValue <= value

        return (
          <button
            key={ratingValue}
            type="button"
            onClick={() => onChange(ratingValue)}
            onMouseEnter={() => setHover(ratingValue)}
            onMouseLeave={() => setHover(null)}
            className="focus:outline-none"
          >
            <FaStar
              size={28}
              className={filled ? "text-yellow-300" : "text-richblack-400"}
            />
          </button>
        )
      })}
    </div>
  )
}


  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm()

  // rating ko watch kar rahe hain taaki ReactStars controlled rahe
  const ratingValue = watch("courseRating", 0)

  useEffect(() => {
    setValue("courseExperience", "")
    setValue("courseRating", 0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const ratingChanged = (newRating) => {
    setValue("courseRating", newRating, { shouldValidate: true })
  }

  const onSubmit = async (data) => {
    await createRating(
      {
        courseId: courseEntireData._id,
        rating: data.courseRating,
        review: data.courseExperience,
      },
      token
    )
    setReviewModal(false)
  }

  const profileImg =
    user?.image ||
    `https://api.dicebear.com/5.x/initials/svg?seed=${user?.firstName} ${user?.lastName}`

  return (
    <div className="fixed inset-0 z-[1000] !mt-0 grid h-screen w-screen place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
      <div className="my-10 w-11/12 max-w-[700px] rounded-lg border border-richblack-400 bg-richblack-800">
        {/* Modal Header */}
        <div className="flex items-center justify-between rounded-t-lg bg-richblack-700 p-5">
          <p className="text-xl font-semibold text-richblack-5">Add Review</p>
          <button onClick={() => setReviewModal(false)}>
            <RxCross2 className="text-2xl text-richblack-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          <div className="flex items-center justify-center gap-x-4">
            <img
              src={profileImg}
              alt={(user?.firstName || "") + " profile"}
              className="aspect-square w-[50px] rounded-full object-cover"
            />
            <div>
              <p className="font-semibold text-richblack-5">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-sm text-richblack-5">Posting Publicly</p>
            </div>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-6 flex flex-col items-center gap-6"
          >
            {/* Rating Stars */}
                  
          <div className="flex flex-col items-center gap-1">
            <StarRating value={ratingValue} onChange={ratingChanged} />

            {/* hidden input so RHF knows about rating + validation */}
            <input
              type="hidden"
              {...register("courseRating", {
                required: true,
                min: 1,
              })}
            />
            {errors.courseRating && (
              <span className="text-xs text-pink-200">
                Please give a rating.
              </span>
            )}
          </div>

            {/* Experience Textarea */}
            <div className="flex w-11/12 flex-col space-y-2">
              <label
                className="text-sm text-richblack-5"
                htmlFor="courseExperience"
              >
                Add Your Experience <sup className="text-pink-200">*</sup>
              </label>
              <textarea
                id="courseExperience"
                placeholder="Add Your Experience"
                {...register("courseExperience", { required: true })}
                className="form-style min-h-[130px] w-full resize-none"
              />
              {errors.courseExperience && (
                <span className="ml-2 text-xs tracking-wide text-pink-200">
                  Please add your experience.
                </span>
              )}
            </div>

            {/* Buttons */}
            <div className="mt-2 flex w-11/12 justify-end gap-x-2">
              <button
                type="button"
                onClick={() => setReviewModal(false)}
                className="flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900"
              >
                Cancel
              </button>
              <IconBtn text="Save" type="submit" />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
