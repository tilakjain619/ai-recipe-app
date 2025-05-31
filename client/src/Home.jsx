import React, { useState } from 'react'
import RecipeCard from './components/RecipeCard';
import GeneratedRecipe from './components/GeneratedRecipe';
import axios from 'axios';

const Home = () => {
    const [ingredients, setIngredients] = useState([]);
    const [recipe, setRecipe] = useState(null);
    const [recommendedRecipes, setRecommendedRecipes] = useState(null);
    const [loading, setLoading] = useState(false);

    const generateRecipe = async () =>{
      try {
        setLoading(true);
        const response = await axios.post("http://localhost:8000/generate_recipe", {
        ingredients: ingredients
      })
      // console.log(response);
      
        setRecipe(response.data.recipe)

        const recommendedResponse = await axios.post("http://localhost:8000/recommended_recipes", {
          ingredients: ingredients
        })
        setRecommendedRecipes(recommendedResponse.data)
      } catch (error) {
        console.log("Not able to generate recipe");
      }
      finally{
        setLoading(false);
      }
    }
  return (
    <div>
      <main className='w-full px-4 py-2 min-h-88 grid items-center justify-center bg-purple-300'>
        <div className='grid gap-2'>
            <h2 className='text-3xl text-center font-bold text-zinc-700'>Recipe Manager + Meal Planner</h2>
            <div className='grid w-full mx-auto max-w-[400px]'>
                <input className='border-2 mt-3 border-purple-400 px-3 py-2 rounded-lg outline-none' value={ingredients} type="text" name="ingredients" placeholder='Tomato, onion, potato...' id="ingredients" onChange={(e) => setIngredients(e.target.value.split(","))}/>
            <small className='text-gray-700 mt-1'>Enter ingredients, seperate each by comma (,)</small>

            <button onClick={generateRecipe} className='cursor-pointer flex items-center justify-center gap-2 mt-3 shadow-2xl shadow-zinc-400 bg-purple-700 hover:bg-purple-600 transition-all duration-100 text-white px-3 py-3 rounded-lg'>Generate <svg className={loading && 'animate-pulse'} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none">
    <path d="M14 12.6483L16.3708 10.2775C16.6636 9.98469 16.81 9.83827 16.8883 9.68032C17.0372 9.3798 17.0372 9.02696 16.8883 8.72644C16.81 8.56849 16.6636 8.42207 16.3708 8.12923C16.0779 7.83638 15.9315 7.68996 15.7736 7.61169C15.473 7.46277 15.1202 7.46277 14.8197 7.61169C14.6617 7.68996 14.5153 7.83638 14.2225 8.12923L11.8517 10.5M14 12.6483L5.77754 20.8708C5.4847 21.1636 5.33827 21.31 5.18032 21.3883C4.8798 21.5372 4.52696 21.5372 4.22644 21.3883C4.06849 21.31 3.92207 21.1636 3.62923 20.8708C3.33639 20.5779 3.18996 20.4315 3.11169 20.2736C2.96277 19.973 2.96277 19.6202 3.11169 19.3197C3.18996 19.1617 3.33639 19.0153 3.62923 18.7225L11.8517 10.5M14 12.6483L11.8517 10.5" stroke="currentColor" stroke-width="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M19.5 2.5L19.3895 2.79873C19.2445 3.19044 19.172 3.38629 19.0292 3.52917C18.8863 3.67204 18.6904 3.74452 18.2987 3.88946L18 4L18.2987 4.11054C18.6904 4.25548 18.8863 4.32796 19.0292 4.47083C19.172 4.61371 19.2445 4.80956 19.3895 5.20127L19.5 5.5L19.6105 5.20127C19.7555 4.80956 19.828 4.61371 19.9708 4.47083C20.1137 4.32796 20.3096 4.25548 20.7013 4.11054L21 4L20.7013 3.88946C20.3096 3.74452 20.1137 3.67204 19.9708 3.52917C19.828 3.38629 19.7555 3.19044 19.6105 2.79873L19.5 2.5Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" />
    <path d="M19.5 12.5L19.3895 12.7987C19.2445 13.1904 19.172 13.3863 19.0292 13.5292C18.8863 13.672 18.6904 13.7445 18.2987 13.8895L18 14L18.2987 14.1105C18.6904 14.2555 18.8863 14.328 19.0292 14.4708C19.172 14.6137 19.2445 14.8096 19.3895 15.2013L19.5 15.5L19.6105 15.2013C19.7555 14.8096 19.828 14.6137 19.9708 14.4708C20.1137 14.328 20.3096 14.2555 20.7013 14.1105L21 14L20.7013 13.8895C20.3096 13.7445 20.1137 13.672 19.9708 13.5292C19.828 13.3863 19.7555 13.1904 19.6105 12.7987L19.5 12.5Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" />
    <path d="M10.5 2.5L10.3895 2.79873C10.2445 3.19044 10.172 3.38629 10.0292 3.52917C9.88629 3.67204 9.69044 3.74452 9.29873 3.88946L9 4L9.29873 4.11054C9.69044 4.25548 9.88629 4.32796 10.0292 4.47083C10.172 4.61371 10.2445 4.80956 10.3895 5.20127L10.5 5.5L10.6105 5.20127C10.7555 4.80956 10.828 4.61371 10.9708 4.47083C11.1137 4.32796 11.3096 4.25548 11.7013 4.11054L12 4L11.7013 3.88946C11.3096 3.74452 11.1137 3.67204 10.9708 3.52917C10.828 3.38629 10.7555 3.19044 10.6105 2.79873L10.5 2.5Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" />
</svg></button>
            </div>
        </div>
      </main>
      {
        recipe &&
        <section className='my-5 px-3 lg:w-[80%] lg:mx-auto'>
            <h2 className='text-2xl mb-3 font-bold text-center text-zinc-700'>Generated Recipe</h2>
            <GeneratedRecipe recipe={recipe}/>
        </section>
      }
      {
        recommendedRecipes &&
        <section className='my-4 px-3 lg:w-[80%] lg:mx-auto'>
        <h2 className='text-2xl mb-3 font-bold text-center text-zinc-700'>Recommended</h2>
        <div className='flex gap-4 lg:gap-8 flex-wrap justify-evenly'>
          {
          recommendedRecipes.map((item, index) =>(
            <RecipeCard key={index} recipe={item}/>
          ))
        }
        </div>
      </section>
      }
      <section className='px-4 sm:flex sm:items-center lg:w-[80%] lg:mx-auto gap-5 bg-purple-200 lg:bg-transparent lg:mt-12 py-6 lg:rounded-lg'>
        <img className='rounded-2xl sm:w-2/4' src="https://wallpaperaccess.com/full/2917213.jpg" alt="Sample Dish" />
        <div className='mt-3'>
          <h2 className='font-bold text-lg lg:text-6xl text-balance lg:font-extrabold lg:text-zinc-800 lg:pr-4 lg:uppercase'>Turn Ingredients into Delicious Creations</h2>
          <p className='lg:text-lg mt-2'>
            ✅ AI Recipe Suggestions<br />
            ✅ Smart Meal Planning<br />
            ✅ Step-by-Step Cooking Guidance
          </p>
        </div>
      </section>
    </div>
  )
}

export default Home
