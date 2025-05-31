import React, { useState } from 'react'

const RecipeCard = ({recipe}) => {
    const [showSteps, setShowSteps] = useState(false);
    return (
        <div className='w-full md:w-2/5 border border-zinc-200 rounded-lg shadow-2xl shadow-zinc-200 px-4 py-3'>
            <h2 className='text-zinc-800 text-lg md:text-xl font-bold'>{recipe.title}</h2>
            <p className='text-sm my-1 md:text-base text-zinc-700 line-clamp-3'>{recipe.description}</p>
            <ul className='capitalize mt-2 text-xs md:text-sm flex flex-wrap gap-1'>
                {
                    recipe.ingredients.map((ingredient, index) =>(
                        <li className='bg-purple-300 px-3 py-0.5 rounded-2xl' key={index}>{ingredient}</li>
                    ))
                }
            </ul>
            <p className='bg-zinc-600 cursor-pointer hover:bg-zinc-700 duration-100 text-white opacity-75 w-fit px-3 mt-2 text-xs rounded-full py-0.5' onClick={() => setShowSteps(!showSteps)}>{showSteps ? 'Hide' : 'Show'} steps</p>
            {
                showSteps &&
                <div>
                <ul className='grid mt-2 gap-1'>
                <h2 className='text-md md:text-lg text-zinc-700 font-bold'>Steps:</h2>
                {
                    recipe.steps?.map((step, index) =>(
                        <li className='text-sm md:text-base' key={index}>{index+1}. {step}</li>
                    ))
                }
            </ul>
            </div>
            }
        </div>
    )
}

export default RecipeCard
