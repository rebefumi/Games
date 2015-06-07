using System;

using Microsoft.Xna.Framework;
using Microsoft.Xna.Framework.Graphics;
using Microsoft.Xna.Framework.Input;

namespace Pong
{
	public class Paddle
	{
		#region Fields
		Texture2D texture;
		Rectangle paddle;

		int limitY;

		#endregion

		#region Constructors
		public Paddle (Texture2D mTexture, int xPosition, int paddleWidth, int paddleHeight, int windowHeight)
		{
	
			texture = mTexture;
			paddle = new Rectangle(xPosition, (windowHeight / 2) - (paddleHeight/2), paddleWidth, paddleHeight);

			limitY = windowHeight - paddle.Height;

		}
		#endregion

		#region Properties
		public Rectangle Collision {
			get { return paddle; }
		}

		#endregion

		#region Methods

		public void movePaddleLeft(){
			KeyboardState keyState = Keyboard.GetState();
			if (keyState.IsKeyDown (Keys.W)) {
				if (paddle.Y > 0) {
					paddle.Y -= 5;
				} else {
					paddle.Y = 0; 
				}
			} else if (keyState.IsKeyDown (Keys.S)) {
				if (paddle.Y < limitY) {
					paddle.Y += 5;
				} else {
					paddle.Y = limitY;
				}
			}
		}

		public void movePaddleRight(){
			KeyboardState keyState = Keyboard.GetState();
			if (keyState.IsKeyDown (Keys.Up)) {
				if (paddle.Y > 0) {
					paddle.Y -= 5;
				} else {
					paddle.Y = 0; 
				}
			} else if (keyState.IsKeyDown (Keys.Down)) {
				if (paddle.Y < limitY) {
					paddle.Y += 5;
				} else {
					paddle.Y = limitY;
				}			
			}
		}

		/// <summary>
		/// Draws the paddle
		/// </summary>
		/// <param name="spriteBatch">sprite batch</param>
		public void Draw(SpriteBatch spriteBatch)
		{
			spriteBatch.Draw(texture, paddle, Color.White);
		}
		#endregion

	}
}

