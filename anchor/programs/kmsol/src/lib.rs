#![allow(clippy::result_large_err)]

use anchor_lang::prelude::*;

declare_id!("coUnmi3oBUtwtd9fjeAvSsJssXh5A5xyPbhpewyzRVF");

#[program]
pub mod kmsol {
    use super::*;

  pub fn close(_ctx: Context<CloseKmsol>) -> Result<()> {
    Ok(())
  }

  pub fn decrement(ctx: Context<Update>) -> Result<()> {
    ctx.accounts.kmsol.count = ctx.accounts.kmsol.count.checked_sub(1).unwrap();
    Ok(())
  }

  pub fn increment(ctx: Context<Update>) -> Result<()> {
    ctx.accounts.kmsol.count = ctx.accounts.kmsol.count.checked_add(1).unwrap();
    Ok(())
  }

  pub fn initialize(_ctx: Context<InitializeKmsol>) -> Result<()> {
    Ok(())
  }

  pub fn set(ctx: Context<Update>, value: u8) -> Result<()> {
    ctx.accounts.kmsol.count = value.clone();
    Ok(())
  }
}

#[derive(Accounts)]
pub struct InitializeKmsol<'info> {
  #[account(mut)]
  pub payer: Signer<'info>,

  #[account(
  init,
  space = 8 + Kmsol::INIT_SPACE,
  payer = payer
  )]
  pub kmsol: Account<'info, Kmsol>,
  pub system_program: Program<'info, System>,
}
#[derive(Accounts)]
pub struct CloseKmsol<'info> {
  #[account(mut)]
  pub payer: Signer<'info>,

  #[account(
  mut,
  close = payer, // close account and return lamports to payer
  )]
  pub kmsol: Account<'info, Kmsol>,
}

#[derive(Accounts)]
pub struct Update<'info> {
  #[account(mut)]
  pub kmsol: Account<'info, Kmsol>,
}

#[account]
#[derive(InitSpace)]
pub struct Kmsol {
  count: u8,
}
