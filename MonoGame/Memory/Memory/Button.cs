using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using Microsoft.Xna.Framework;
using Microsoft.Xna.Framework.Graphics;
using Microsoft.Xna.Framework.Input;

namespace Memory
{
	public class Button
	{
		Texture2D sprite;

		Rectangle drawRectangle;
		Rectangle sourceRectangle;

		int buttonWidth;

		bool clickStarted = false;
		bool buttonReleased = true;

		GameState state;
			
			public Button (Texture2D button, Vector2 center, GameState stateButton)
		{
			sprite = button;
			LoadContent (center);
			state = stateButton;
		}

		private void LoadContent (Vector2 center){
			buttonWidth = sprite.Width / 2;
			drawRectangle = new Rectangle ((int)center.X- buttonWidth, (int)center.Y- sprite.Height / 2, buttonWidth, sprite.Height);
			sourceRectangle = new Rectangle(0, 0, buttonWidth, sprite.Height);

		}

		public void Update (MouseState mouse){
			if (drawRectangle.Contains(mouse.X, mouse.Y))
			{
				sourceRectangle.X = buttonWidth;

				if (mouse.LeftButton == ButtonState.Pressed && buttonReleased)
				{
					clickStarted = true;
					buttonReleased = false;
				}
				else if (mouse.LeftButton == ButtonState.Released)
				{
					buttonReleased = true;

					if (clickStarted)
					{
						clickStarted = false;
						Game1.ChangeState(state);
					}
				}
			}
			else
			{
				sourceRectangle.X = 0;
				clickStarted = false;
				buttonReleased = false;
			}
		
		}

		public void Draw (SpriteBatch spriteBatch){
			spriteBatch.Draw (sprite, drawRectangle, sourceRectangle, Color.White);
		}
	}
}

