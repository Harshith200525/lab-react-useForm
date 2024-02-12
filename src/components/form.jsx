import './form.css'
import { useForm } from 'react-hook-form'

const Form = () => {
  const { register, handleSubmit, formState: { errors, isSubmitSuccessful, isSubmitting } } = useForm()

  const onSubmit = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 2000))
    console.log(data)
  }

  return (
    <div className="form-container">   
      <form onSubmit={handleSubmit(onSubmit)}>
      {isSubmitSuccessful ? <div className='success-box'><h3>Form submitted successfully!</h3></div> : null}
        <div className='input-box-container'>
          <input type="text" placeholder="First name" {...register('firstName', {
            required: 'First name is required',
            pattern: {
              value: /^[A-Za-z]+$/i,
              message: 'Invalid first name'
            }
          })} />
          {errors.firstName && <p>{errors.firstName.message}</p>}
        </div>
        <div className='input-box-container'>
          <input type="text" placeholder="Last name" {...register('lastName', {
            required: 'Last name is required',
            pattern: {
              value: /^[A-Za-z]+$/i,
              message: 'Invalid last name'
            }
          })} />
          {errors.lastName && <p>{errors.lastName.message}</p>}
        </div>
        <div className='input-box-container'>
          <input type="text" placeholder="Email" {...register('email', {
            required: 'Email is required',
            validate: (value) => {
              if (!value.includes('@')) {
                return 'Invalid email'
              }
            },
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email'
            }
          })} />
          {errors.email && <p>{errors.email.message}</p>}
        </div>
        <div className='input-box-container'>
          <input type="password" placeholder="Password" {...register('pass', {
            required: 'Password is required',
            minLength: {
              value: 4,
              message: 'Password must be at least 4 characters'
            },
            maxLength: {
              value: 20,
              message: 'Password must be less than 20 characters'
            },
            pattern: {
              value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{4,20}$/,
              message: 'Password must contain at least one uppercase, one lowercase, one number, and one special character'
            }
          })} />
          {errors.pass && <p>{errors.pass.message}</p>}
        </div>
        <button disabled={isSubmitting} type="submit">{isSubmitting ? "Loading..." : "Submit"}</button>
      </form>

    </div>
  )
}

export default Form