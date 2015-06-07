#region File Description
//-----------------------------------------------------------------------------
// PongGame.cs
//
// Microsoft XNA Community Game Platform
// Copyright (C) Microsoft Corporation. All rights reserved.
//-----------------------------------------------------------------------------
#endregion

#region Using Statements
using System;

using Microsoft.Xna.Framework;
using Microsoft.Xna.Framework.Audio;
using Microsoft.Xna.Framework.Graphics;
using Microsoft.Xna.Framework.Input;
using Microsoft.Xna.Framework.Input.Touch;
using Microsoft.Xna.Framework.Storage;
using Microsoft.Xna.Framework.Content;
using Microsoft.Xna.Framework.Media;

#endregion

namespace Pong
{
	/// <summary>
	/// Default Project Template
	/// </summary>
	public class Game1 : Game
	{

		#region Fields
		int MAX_WIDTH = 800;
		int MAX_HEIGHT = 600; 
		int MARGIN = 30;

		int PADDLE_HEIGHT = 150;
		int PADDLE_WIDTH = 40;

		GraphicsDeviceManager graphics;
		SpriteBatch spriteBatch;
	
		Paddle bladeLeft;
		Paddle bladeRight;

		Ball ball;

		Score score;

		#endregion

		#region Initialization

		public Game1 ()
		{
			graphics = new GraphicsDeviceManager (this);
			
			Content.RootDirectory = "Assets";

			graphics.IsFullScreen = false;

			graphics.PreferredBackBufferWidth = MAX_WIDTH;
			graphics.PreferredBackBufferHeight = MAX_HEIGHT;
		}

		/// <summary>
		/// Overridden from the base Game.Initialize. Once the GraphicsDevice is setup,
		/// we'll use the viewport to initialize some values.
		/// </summary>
		protected override void Initialize ()
		{
			base.Initialize ();

		}


		/// <summary>
		/// Load your graphics content.
		/// </summary>
		protected override void LoadContent ()
		{
			// Create a new SpriteBatch, which can be use to draw textures.
			spriteBatch = new SpriteBatch (graphics.GraphicsDevice);

			//Load paddles
			bladeLeft = new Paddle (Content.Load<Texture2D> ("pala_blanca"), MARGIN, PADDLE_WIDTH, PADDLE_HEIGHT , MAX_HEIGHT);
			bladeRight = new Paddle (Content.Load<Texture2D> ("pala_roja"), MAX_WIDTH - MARGIN - PADDLE_WIDTH, PADDLE_WIDTH, PADDLE_HEIGHT , MAX_HEIGHT);


			//Initialize the sprite to draw the score
			score = new Score ( Content.Load<SpriteFont>("Font"), new Vector2((MAX_WIDTH / 2), MARGIN));

			//Load ball
			ball = new Ball (Content.Load<Texture2D> ("ball"), MAX_WIDTH, MAX_HEIGHT, score);

		}

		#endregion

		#region Update and Draw

		/// <summary>
		/// Allows the game to run logic such as updating the world,
		/// checking for collisions, gathering input, and playing audio.
		/// </summary>
		/// <param name="gameTime">Provides a snapshot of timing values.</param>
		protected override void Update (GameTime gameTime)
		{	
			ball.Update(gameTime);

			//Detect the movement of the paddles
			bladeLeft.movePaddleLeft();
			bladeRight.movePaddleRight ();

			//Detect the collision with de paddles
			collisionPaddle ();
			base.Update (gameTime);
		}

		/// <summary>
		/// This is called when the game should draw itself. 
		/// </summary>
		/// <param name="gameTime">Provides a snapshot of timing values.</param>
		protected override void Draw (GameTime gameTime)
		{
			// Clear the backbuffer
			graphics.GraphicsDevice.Clear (Color.CornflowerBlue);

			spriteBatch.Begin ();

			//Draw paddles and ball
			bladeLeft.Draw (spriteBatch);
			bladeRight.Draw (spriteBatch);

			ball.Draw (spriteBatch);
			score.Draw (spriteBatch);

			spriteBatch.End ();

			base.Draw (gameTime);
		}

		#endregion

		private void collisionPaddle (){
			
			if (bladeLeft.Collision.Intersects (ball.Collision)) {

				if (ball.DrawRectangle.Bottom + ball.Radius >= bladeLeft.Collision.Top || ball.DrawRectangle.Top + ball.Radius <= bladeLeft.Collision.Bottom) {
					ball.SpeedX = ball.SpeedX * -1;
				} else {


					if (ball.DrawRectangle.Left - ball.Radius < bladeLeft.Collision.Right){
					}
					if (ball.DrawRectangle.Top + ball.Radius > bladeLeft.Collision.Bottom){
					}
				}

			}


			if (bladeRight.Collision.Intersects (ball.Collision)) {
				if (ball.DrawRectangle.Bottom + ball.Radius >= bladeRight.Collision.Top || ball.DrawRectangle.Top + ball.Radius <= bladeRight.Collision.Bottom) {
					ball.SpeedX = ball.SpeedX * -1;
				} else {

					ball.SpeedY = ball.SpeedY * -1;
				}
			}
		}
	}
}
